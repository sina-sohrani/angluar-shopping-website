from decimal import Decimal

from rest_framework import serializers

from .models import Order, OrderItem, Product


class ProductSerializer(serializers.ModelSerializer):
    originalPrice = serializers.DecimalField(
        source='original_price',
        max_digits=10,
        decimal_places=2,
        allow_null=True,
        required=False,
    )
    reviewCount = serializers.IntegerField(source='review_count')
    inStock = serializers.BooleanField(source='in_stock')

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'description',
            'price',
            'originalPrice',
            'category',
            'image',
            'rating',
            'reviewCount',
            'badge',
            'inStock',
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['price'] = float(data['price'])
        if data.get('originalPrice') is not None:
            data['originalPrice'] = float(data['originalPrice'])
        else:
            data.pop('originalPrice', None)
        data['rating'] = float(data['rating'])
        if not data.get('badge'):
            data.pop('badge', None)
        return data


class OrderItemWriteSerializer(serializers.Serializer):
    productId = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class OrderCreateSerializer(serializers.Serializer):
    firstName = serializers.CharField(max_length=100)
    lastName = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=100)
    zipCode = serializers.CharField(max_length=20)
    items = OrderItemWriteSerializer(many=True)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError('Order must include at least one item.')
        return value

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        product_ids = [item['productId'] for item in items_data]
        products = Product.objects.in_bulk(product_ids)

        subtotal = Decimal('0.00')
        order_items = []

        for item in items_data:
            product = products.get(item['productId'])
            if product is None:
                raise serializers.ValidationError(
                    {'items': f'Product {item["productId"]} not found.'}
                )
            if not product.in_stock:
                raise serializers.ValidationError(
                    {'items': f'{product.name} is out of stock.'}
                )
            line_total = product.price * item['quantity']
            subtotal += line_total
            order_items.append((product, item['quantity'], product.price))

        shipping = Decimal('0.00') if subtotal >= Decimal('100.00') else Decimal('9.99')
        total = subtotal + shipping

        order = Order.objects.create(
            first_name=validated_data['firstName'],
            last_name=validated_data['lastName'],
            email=validated_data['email'],
            address=validated_data['address'],
            city=validated_data['city'],
            zip_code=validated_data['zipCode'],
            subtotal=subtotal,
            shipping=shipping,
            total=total,
        )

        OrderItem.objects.bulk_create(
            [
                OrderItem(
                    order=order,
                    product=product,
                    quantity=quantity,
                    price=price,
                )
                for product, quantity, price in order_items
            ]
        )

        return order


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'address',
            'city',
            'zip_code',
            'subtotal',
            'shipping',
            'total',
            'created_at',
            'items',
        ]

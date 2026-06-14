from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product
from .serializers import OrderCreateSerializer, OrderSerializer, ProductSerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        if category and category != 'All':
            queryset = queryset.filter(category=category)
        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryListView(APIView):
    def get(self, request):
        return Response([choice[0] for choice in Product.CATEGORY_CHOICES])


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED,
        )

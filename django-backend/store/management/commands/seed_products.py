from decimal import Decimal

from django.core.management.base import BaseCommand

from store.models import Product

PRODUCTS = [
    {
        'name': 'Wireless Headphones Pro',
        'description': (
            'Premium noise-cancelling headphones with 40-hour battery life '
            'and crystal-clear sound.'
        ),
        'price': Decimal('149.99'),
        'original_price': Decimal('199.99'),
        'category': 'Electronics',
        'image': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
        'rating': Decimal('4.8'),
        'review_count': 324,
        'badge': 'Best Seller',
        'in_stock': True,
    },
    {
        'name': 'Smart Watch Series X',
        'description': (
            'Track your fitness, receive notifications, and stay connected with style.'
        ),
        'price': Decimal('299.99'),
        'category': 'Electronics',
        'image': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
        'rating': Decimal('4.6'),
        'review_count': 189,
        'in_stock': True,
    },
    {
        'name': 'Classic Leather Jacket',
        'description': (
            'Handcrafted genuine leather jacket with a timeless design for every season.'
        ),
        'price': Decimal('189.99'),
        'original_price': Decimal('249.99'),
        'category': 'Fashion',
        'image': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop',
        'rating': Decimal('4.7'),
        'review_count': 156,
        'badge': 'Sale',
        'in_stock': True,
    },
    {
        'name': 'Minimalist Sneakers',
        'description': 'Lightweight everyday sneakers with premium comfort and clean aesthetics.',
        'price': Decimal('89.99'),
        'category': 'Fashion',
        'image': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
        'rating': Decimal('4.5'),
        'review_count': 412,
        'in_stock': True,
    },
    {
        'name': 'Ceramic Coffee Set',
        'description': 'Elegant 6-piece ceramic coffee set perfect for your morning ritual.',
        'price': Decimal('54.99'),
        'category': 'Home',
        'image': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca6d?w=600&h=600&fit=crop',
        'rating': Decimal('4.9'),
        'review_count': 98,
        'badge': 'New',
        'in_stock': True,
    },
    {
        'name': 'Scented Candle Collection',
        'description': 'Set of 3 hand-poured soy candles with natural essential oils.',
        'price': Decimal('34.99'),
        'category': 'Home',
        'image': 'https://images.unsplash.com/photo-1602874801006-4f2740a4d2a2?w=600&h=600&fit=crop',
        'rating': Decimal('4.4'),
        'review_count': 67,
        'in_stock': True,
    },
    {
        'name': 'Yoga Mat Premium',
        'description': 'Non-slip eco-friendly yoga mat with carrying strap included.',
        'price': Decimal('49.99'),
        'original_price': Decimal('69.99'),
        'category': 'Sports',
        'image': 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
        'rating': Decimal('4.6'),
        'review_count': 203,
        'in_stock': True,
    },
    {
        'name': 'Running Shoes Elite',
        'description': 'Engineered for speed and comfort with responsive cushioning technology.',
        'price': Decimal('129.99'),
        'category': 'Sports',
        'image': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop',
        'rating': Decimal('4.7'),
        'review_count': 278,
        'badge': 'Popular',
        'in_stock': True,
    },
    {
        'name': 'Portable Bluetooth Speaker',
        'description': 'Waterproof speaker with 360° sound and 12-hour playtime.',
        'price': Decimal('79.99'),
        'category': 'Electronics',
        'image': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
        'rating': Decimal('4.3'),
        'review_count': 145,
        'in_stock': True,
    },
    {
        'name': 'Linen Throw Blanket',
        'description': 'Soft, breathable linen blanket that adds warmth and style to any room.',
        'price': Decimal('64.99'),
        'category': 'Home',
        'image': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
        'rating': Decimal('4.8'),
        'review_count': 89,
        'in_stock': True,
    },
    {
        'name': 'Designer Sunglasses',
        'description': 'UV400 protection with polarized lenses in a sleek modern frame.',
        'price': Decimal('119.99'),
        'original_price': Decimal('159.99'),
        'category': 'Fashion',
        'image': 'https://images.unsplash.com/photo-1572635196233-8f0f41b25115?w=600&h=600&fit=crop',
        'rating': Decimal('4.5'),
        'review_count': 112,
        'in_stock': True,
    },
    {
        'name': 'Fitness Tracker Band',
        'description': 'Monitor heart rate, sleep, and workouts with a sleek wearable design.',
        'price': Decimal('59.99'),
        'category': 'Sports',
        'image': 'https://images.unsplash.com/photo-1575311373938-040b8e1fd5b6?w=600&h=600&fit=crop',
        'rating': Decimal('4.2'),
        'review_count': 334,
        'in_stock': False,
    },
]


class Command(BaseCommand):
    help = 'Seed the database with sample products'

    def handle(self, *args, **options):
        if Product.objects.exists():
            self.stdout.write('Products already exist. Skipping seed.')
            return

        Product.objects.bulk_create([Product(**data) for data in PRODUCTS])
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(PRODUCTS)} products.'))

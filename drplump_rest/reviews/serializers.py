from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "review_id",
            "user_id",
            "rating",
            "title",
            "content",
            "date",
            "treatment_type"
        ]
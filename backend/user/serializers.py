from django.contrib.auth import get_user_model
from rest_framework import serializers, validators
from .models import MyUser


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        User = get_user_model()
        fields = ('username', 'password', 'email', 'phone_number')

        extra_kwargs = {
            'password': {'write_only': True},
            'email': {
                'required': True,
                'allow_blank': False,
                'validators': [
                    validators.UniqueValidator(
                        User.objects.all(), 'User with that Email already Exist'
                    )
                ]
            },
            'phone_number': {
                'required': True,
                'allow_blank': False,
                'validators': [
                    validators.UniqueValidator(
                        User.objects.all(), 'User with that Phone number already Exist'
                    )
                ]
            }
        }

    def create(self, validated_data):
        User = get_user_model()
        username = validated_data.get('username')
        password = validated_data.get('password')
        email = validated_data.get('email')
        phone_number = validated_data.get('phone_number')

        if username:
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                phone_number=phone_number
            )
        else:
            user = User.objects.create_user(
                password=password,
                email=email,
                phone_number=phone_number
            )
        return user


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'email', 'username', 'phone_number']
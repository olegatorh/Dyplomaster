from knox.models import AuthToken
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import RegisterSerializer
from .utils.AuthTokenSerializer import AuthTokenSerializer


@api_view(['POST'])
def login_api(request):
    serializer = AuthTokenSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']

    _, token = AuthToken.objects.create(user)
    return Response(
        {
            'user_info': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'phone_number': str(user.phone_number)
            },
            'token': token
        }
    )


@api_view(['POST'])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    _, token = AuthToken.objects.create(user)

    return Response(
        {
            'user_info': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'phone_number': str(user.phone_number)
            },
            'token': token
        }
    )


@api_view(['GET'])
def user_api(request):
    user = request.user

    if user.is_authenticated:
        return Response(
            {
                'user_info': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'phone_number': str(user.phone_number)
                }
            }
        )
    else:
        return Response({'error': 'not authenticated'}, status=400)

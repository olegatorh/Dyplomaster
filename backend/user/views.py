from knox.models import AuthToken
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, MyUserSerializer
from .utils.AuthTokenSerializer import AuthTokenSerializer
from .models import MyUser
from rest_framework import status


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


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def change_user_api(request, *args, **kwargs):
    user_id = kwargs.get('pk')

    try:
        user = MyUser.objects.get(pk=user_id)
    except MyUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = MyUserSerializer(user, data=request.data['userWithoutToken'], partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
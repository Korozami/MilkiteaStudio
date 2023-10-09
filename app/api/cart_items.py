from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Product, Cart_Item, Cart
from ..forms.cart_items_form import CartItemForm
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('carts', __name__)


@cart_routes.route('/')
def get_cart():
    carts = Cart.query.filter_by(user_id=current_user.id).all()
    # return {'carts': {cart.id: cart.to_dict() for cart in carts}}, 200
    if carts:
        return carts.to_dict()
    elif not carts:
        return {"message": "Cart is currently empty"}


@cart_routes.route('/<int:product_id>/add', methods=["POST"])
def add_cart_items():
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

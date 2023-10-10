from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Cart_Item, Cart
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
def add_cart_items(product_id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cart = Cart.query.filter_by(user_id=current_user.id).first()
    existing_cart_item = Cart_Item.query.filter_by(
        cart_id=cart.id, product_id=product_id).first()

    if existing_cart_item:
        return {'message': 'Product already in cart'}, 400


    if form.validate_on_submit():
        if not cart:
            new_cart = Cart(
                user_id = current_user.id
            )
            cart_item = Cart_Item(
                item_amount = form.data['item_amount'],
                cart_id = cart.id,
                product_id = product_id
            )
            db.session.add(new_cart)
            db.session.add(cart_item)
            db.session.commit()
            return cart.to_dict()
        elif cart:
            cart_item = Cart_Item(
                item_amount = form.data['item_amount'],
                cart_id = cart.id,
                product_id = product_id
            )
            db.session.add(cart_item)
            return cart.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@cart_routes.route('/<int:product_id>/update', methods=["PUT", "PATCH"])
def update_cart_items(product_id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cart_item = Cart_Item.query.filter_by(product_id_id=product_id)

    if not cart_item:
        return {'message': 'Cart Item not found'}

    if form.validate_on_submit():
        cart_item.item_amount = form.data['item_amount']

        db.session.commit()
        return cart_item.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@cart_routes.route('<int:product_id>/delete', methods=["DELETE"])
def delete_cart_items(product_id):
    cart_item = Cart_Item.query.filter_by(product_id=product_id)
    if not cart_item:
        return {"message": "Cart Item not found"}, 404

    db.session.delete(cart_item)
    db.session.commit()
    return {"message": "Cart Item deleted successfully"}, 200

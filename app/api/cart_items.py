from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Cart_Item, Cart
from ..forms.cart_items_form import CartItemForm
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('carts', __name__)


@cart_routes.route('/')
@login_required
def get_cart():
    carts = Cart.query.filter_by(user_id=current_user.id).first()
    if carts:
        return carts.to_dict()
    elif not carts:
        new_cart = Cart(
            user_id=current_user.id
        )
        db.session.add(new_cart)
        db.session.commit()
        return new_cart.to_dict()


@cart_routes.route('/<int:product_id>')
@login_required
def get_cart_item(product_id):
    cart = Cart.query.filter_by(user_id=current_user.id).first()
    cart_item = Cart_Item.query.filter_by(cart_id=cart.id, product_id=product_id).first()

    if not cart_item:
        return {'message': 'Product not found'}, 404

    return cart_item.to_dict()


@cart_routes.route('/<int:product_id>/add', methods=["POST"])
@login_required
def add_cart_items(product_id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cart = Cart.query.filter_by(user_id=current_user.id).first()
    existing_cart_item = Cart_Item.query.filter_by(
        cart_id=cart.id, product_id=product_id).first()

    if existing_cart_item:
        return {'message': 'Product already in cart'}, 400


    if form.validate_on_submit():
        cart_item = Cart_Item(
            item_amount = form.data['item_amount'],
            cart_id = cart.id,
            product_id = product_id
        )
        db.session.add(cart_item)
        db.session.commit()
        return cart_item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@cart_routes.route('/<int:product_id>/update', methods=["PUT", "PATCH"])
@login_required
def update_cart_items(product_id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cart_item = Cart_Item.query.get(product_id)

    if not cart_item:
        return {'message': 'Cart Item not found'}

    if form.validate_on_submit():
        cart_item.item_amount = form.data['item_amount']

        db.session.commit()
        return cart_item.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@cart_routes.route('<int:product_id>/delete', methods=["DELETE"])
@login_required
def delete_cart_items(product_id):
    cart_item = Cart_Item.query.get(product_id)
    if not cart_item:
        return {"message": "Cart Item not found"}, 404

    db.session.delete(cart_item)
    db.session.commit()
    return {"message": "Cart Item deleted successfully"}, 200

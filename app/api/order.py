from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order, Address, Payment, Order_Item, Cart_Item, Cart
from ..forms.order_form import OrderForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

order_routes = Blueprint('order', __name__)


@order_routes.route('/')
@login_required
def get_orders():
    if current_user.admin:
        orders = Order.query.all()
        return {'orders': {order.id: order.to_dict() for order in orders}}, 200
    else:
        orders = Order.query.filter_by(user_id=current_user.id).all()
        return {'orders': {order.id: order.to_dict() for order in orders}}, 200


@order_routes.route('/<int:order_id>')
@login_required
def get_order_id(order_id):
    order = Order.query.get_or_404(order_id)

    if not order:
        return {'message': 'Order not found'}, 404

    return order.to_dict()


@order_routes.route('/add/<int:address_id>/<int:payment_id>', methods=["POST"])
@login_required
def add_orders(address_id, payment_id):
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    address = Address.query.get(address_id)
    payment = Payment.query.get(payment_id)
    cart = Cart.query.filter_by(user_id=current_user.id).first()
    cart_item = Cart_Item.query.filter_by(cart_id=cart.id).all()
    order = Order.query.filter_by(user_id=current_user.id).all()
    i = 0
    order_id = 1

    if address.user_id != current_user.id:
        return {'message': 'This address does not belong to this user'}

    if payment.user_id != current_user.id:
        return {'message': 'This payment does not belong to this user'}
    cart_item_data = [items.to_dict() for items in cart_item]

    order_item_data = [items.to_dict() for items in order]

    # print(cart_item_data[0]['product'])
    # return str(cart_item_data[0]['product']['id'])
    # print(order)
    # return(order_item_data)

    if(len(order) > 0):
        j = 0
        id = 0
        while j < len(order_item_data):
            id = order_item_data[j]['id']
            j += 1
        order_id = int(id) + 1


    if form.validate_on_submit():
        order = Order(
            user_id = current_user.id,
            order_number = form.data['order_number'],
            shipping_method = form.data['shipping_method'],
            tracking_number = form.data['tracking_number'],
            shipped = False,
            date_ordered = datetime.now(),
            address_order = address_id,
            payment_order = payment_id
        )
        db.session.add(order)
        while i < len(cart_item_data):
            item_amount = int(cart_item_data[i]['item_amount'])
            id = int(cart_item_data[i]['product']['id'])
            order_item = Order_Item(
                item_amount = item_amount,
                order_id = order_id,
                product_id = id
            )
            db.session.add(order_item)
            i += 1

        db.session.commit()
        return order.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@order_routes.route('/<int:order_id>/update', methods=["PUT", "PATCH"])
@login_required
def update_orders(order_id):
    order = Order.query.get(order_id)
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not current_user.admin:
        return {'message': 'Unauthorized'}, 401

    if form.validate_on_submit():
        order.order_number = form.data['order_number']
        order.shipping_method = form.data['shipping_method']
        order.tracking_number = form.data['tracking_number']
        order.shipped = form.data['shipped']
        db.session.commit()

        return order.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@order_routes.route('/<int:order_id>/delete', methods=["DELETE"])
@login_required
def delete_orders(order_id):
    order = Order.query.get(order_id)

    if not order:
        return {'message': 'Order not found'}, 404

    if not current_user.admin:
        return {'message': 'Unauthorized'}, 401

    db.session.delete(order)
    db.session.commit()
    return {'message': 'Successfully Deleted'}, 200

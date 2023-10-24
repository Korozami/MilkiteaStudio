from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order, Cart, Address, Payment
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
    cart = Cart.query.filter_by(user_id=current_user.id).first()
    address = Address.query.get(address_id)
    payment = Payment.query.get(payment_id)

    if address.user_id != current_user.id:
        return {'message': 'This address does not belong to this user'}

    if payment.user_id != current_user.id:
        return {'message': 'This payment does not belong to this user'}
    # user_address = Address.query.filter_by(user_id=current_user.id).all()
    # user_address_data = [address.to_dict() for address in user_address]
    # user_payment = Payment.query.filter_by(user_id=current_user.id).all()
    # payment_address_data = [payment.to_dict() for payment in user_payment]

    # for address in user_address_data:
    #     if (address.primary):
    #         primary_address = address.id
    #     else:
    #         primary_address = Address.query.filter_by(user_id=current_user.id).first()


    # for payment in payment_address_data:
    #     if payment.primary:
    #         primary_payment = payment.id
    #     else:
    #         primary_payment = Payment.query.filter_by(user_id=current_user.id).first()


    if form.validate_on_submit():
        order = Order(
            user_id = current_user.id,
            cart_id = cart.id,
            order_number = form.data['order_number'],
            tracking_number = form.data['tracking_number'],
            shipped = False,
            date_ordered = datetime.now(),
            address_order = address_id,
            payment_order = payment_id
        )
        db.session.add(order)
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

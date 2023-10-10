from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Order, Cart
from ..forms.order_form import OrderForm
from .auth_routes import validation_errors_to_error_messages

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


@order_routes.route('/add', methods=["POST"])
@login_required
def add_orders():
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    cart = Cart.query.filter_by(user_id=current_user.id)

    if form.validate_on_submit():
        order = Order(
            user_id = current_user.id,
            cart_id = cart.id,
            order_number = form.data['order_number'],
            tracking_number = form.data['tracking_number'],
            shipped = form.data['shipped'],
            date_ordered = form.data['date_ordered']
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
        order.date_ordered = form.data['date_ordered']

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

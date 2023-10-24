from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Payment
from ..forms.payment_form import PaymentForm
from .auth_routes import validation_errors_to_error_messages

payment_routes = Blueprint('payments', __name__)


@payment_routes.route('/')
@login_required
def get_payment():
    '''
    Get payments
    '''
    payments = Payment.query.filter_by(user_id=current_user.id).all()
    return {'payments': {payment.id: payment.to_dict() for payment in payments}}, 200


@payment_routes.route('/<int:payment_id>')
@login_required
def get_payment_id(payment_id):
    payment = Payment.query.get_or_404(payment_id)

    if not payment:
        return {'message': 'Payment not found'}, 404

    return payment.to_dict()


@payment_routes.route('/add', methods=["POST"])
@login_required
def create_payment():
    form = PaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        payment = Payment(
            user_id = current_user.id,
            card_number = form.data['card_number'],
            name = form.data['name'],
            expiration_date = form.data['expiration_date'],
            security_code = form.data['security_code'],
            billing_address = form.data['billing_address']
        )
        db.session.add(payment)
        db.session.commit()
        return payment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@payment_routes.route('/<int:payment_id>/update', methods=["PUT", "PATCH"])
@login_required
def update_payment(payment_id):
    form = PaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    payment =  Payment.query.get(payment_id)
    if form.validate_on_submit():
        if not payment:
            return {'message': 'Payment info not found'}
        elif payment.user_id != current_user.id:
            return {"message": "You cannot edit an payment that isn't yours"}
        else:
            payment.card_number = form.data['card_number']
            payment.name = form.data['name']
            payment.expiration_date = form.data['expiration_date']
            payment.security_code = form.data['security_code']
            payment.billing_address = form.data['billing_address']
            payment.primary = form.data['primary']
            db.session.commit()
            return payment.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@payment_routes.route('/<int:payment_id>/delete', methods=['DELETE'])
@login_required
def delete_payment(payment_id):
    payment = Payment.query.get(payment_id)
    if not payment:
        return {'message': 'Payment not found'}
    elif payment.user_id != current_user.id:
        return {"message": "You cannot delete an payment that is not yours"}
    elif payment:
        db.session.delete(payment)
        db.session.commit()
        return {'message': 'Successfuly deleted'}

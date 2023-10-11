from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Address
from ..forms.address_form import AddressForm
from .auth_routes import validation_errors_to_error_messages

address_routes = Blueprint('addresses', __name__)


@address_routes.route('/')
@login_required
def get_address():
    addresses = Address.filter_by(user_id=current_user.id).all()
    return {'addresses': {address.id: address.to_dict() for address in addresses}}, 200


@address_routes.route('/add', methods=["POST"])
@login_required
def create_address():
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        address = Address(
            user_id = current_user.id,
            city = form.data['city'],
            address = form.data['address'],
            state = form.data['state'],
            country = form.data['country'],
            zip = form.data['zip']
        )
        db.session.add(address)
        db.session.commit()
        return address.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@address_routes.route('/<int:address_id>/update', methods=["PUT", "PATCH"])
@login_required
def update_address(address_id):
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        address = Address.query.get_or_404(address_id)
        if not address:
            return {'message': 'Address info not found'}
        elif address.user_id != current_user.id:
            return {'message': "You cannot edit an address that isn't yours"}
        else:
            address.city = form.data['city'],
            address.address = form.data['address'],
            address.state = form.data['state'],
            address.country = form.data['country'],
            address.zip = form.data['zip']
            db.session.commit()
            return address.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@address_routes.route('/<int:address_id>/delete', methods=["DELETE"])
@login_required
def delete_address(address_id):
    address = Address.query.get_or_404(address_id)
    if not address:
        return {'message': 'Address not found'}
    elif address.user_id != current_user.id:
        return {"message": "You cannot delete and address that isn't yours"}
    elif address:
        db.session.delete(address)
        db.session.commit()
        return {'message': 'Successfully deleted'}
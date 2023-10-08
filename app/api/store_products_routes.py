from flask import Blueprint, request, send_from_directory, url_for
from flask_login import login_required, current_user
from app.models import db, Store, Product
from ..forms.product_form import ProductForm
from ..forms.store_form import StoreForm
from ..forms.product_images_form import ProductImageForm, photos
from .auth_routes import validation_errors_to_error_messages
import os
import app.config
store_product_routes = Blueprint('storeproducts', __name__)


@store_product_routes.route('/status')
def get_store():
    '''
    Get store
    '''
    stores = Store.query.all()
    return {'stores': {store.id: store.to_dict() for store in stores}}, 200


@store_product_routes.route('/update', methods=["PUT,PATCH"])
def update_store():
    form = StoreForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    stores = Store.query.get(1)
    if current_user.admin != True:
        return {'message': 'Unauthorized'}, 401

    if form.validate_on_submit():

        stores.online = form.data['online'],

        db.session.commit()

        return stores.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@store_product_routes.route('/')
def get_all_products():
    '''
    Get all the store products
    '''
    products = Product.query.all()
    return {'products': {product.id: product.to_dict() for product in products}}, 200


@store_product_routes.route('/products/<int:product_id>')
def product_id(product_id):
    '''
    Get a product by id
    '''
    product = Product.query.get_or_404(product_id)

    if not product:
        return {'message': 'Product not found'}, 404

    return product.to_dict()


@store_product_routes.route('/products/create', methods=["POST"])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if current_user.admin != True:
        return {'message': 'Unauthorized'}, 401

    if form.validate_on_submit():
        product = Product(
            store_id = 1,
            item_name=form.data['item_name'],
            description = form.data['description'],
            price = form.data['price'],
            category = form.data['category'],
            quanity = form.data['quantity'],
            hide = form.data['hide']
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@store_product_routes.route('/products/<int:product_id>/update', methods=["PUT", "PATCH"])
@login_required
def update_product_id(product_id):

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    product = Product.query.get_or_404(product_id)

    if not product:
        return {'message': 'Product not found'}, 404

    if current_user.admin != True:
        return {'message': 'Unauthorized'}, 401

    if form.validate_on_submit():
        product.item_name = form.data['item_name']
        product.description = form.data['description']
        product.price = form.data['price']
        product.category = form.data['category']
        product.quanity = form.data['quantity']
        product.hide = form.data['hide']

        db.session.commit()
        return product.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@store_product_routes.route('/products/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    '''
    delete a product from store
    '''
    product = Product.query.get_or_404(product_id)

    if not product:
        return {'message': 'Product not found'}, 404

    if current_user.admin != True:
        return {'message': 'Unauthorized'}, 401

    db.session.delete(product)
    db.session.commit()
    return {'message': 'Successfully Deleted'}, 200


# @store_product_routes.route('/products/images', methods=["GET", "POST"])
# @login_required
# def upload_image():
#     if request.method == "POST":
#         if request.files:
#             image = request.files['image']

#             if image.filename =="":
#                 return {'message': "Image must have filename"}

#             image.save(os.path.join(app.config["IMAGE_UPLOADS"], image.filename))
#             return redirect(request.url)
@store_product_routes.route('/uploads/<filename>')
def get_file(filename):
    return send_from_directory(app.config["IMAGE_UPLOADS"])


@store_product_routes.route('/products/images', methods=["POST"])
@login_required
def upload_image():
    form = ProductImageForm()
    if form.validate_on_submit():
        filename = photos.save(form.photo.data)
        file_url = url_for('get_file', filename=filename)
    else:
        file_url = None

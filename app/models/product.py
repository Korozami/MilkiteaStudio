from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stores.id')), nullable=False)
    item_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(255))
    quantity = db.Column(db.Integer, nullable=False)
    hide = db.Column(db.Boolean, default=False)
    display = db.Column(db.Boolean, default=False)

    stores = relationship('Store', back_populates='product')
    product_image = relationship('Product_Image', back_populates='product', cascade='all, delete-orphan')
    cart_item = relationship("Cart_Item", back_populates='product', cascade='all, delete-orphan')

    def to_dict(self):
        product_image_data = []
        for product_images in self.product_image:
            product_image_data.append(product_images.to_dict())
        return {
            'id': self.id,
            'store_id': self.store_id,
            'item_name': self.item_name,
            'description': self.description,
            'size': self.size,
            'price': self.price,
            'category': self.category,
            'quantity': self.quantity,
            'hide': self.hide,
            'display': self.display,
            'product_images': product_image_data
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Order_Item(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    item_amount = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    order = relationship("Order", back_populates='order_item')
    product = relationship("Product", back_populates='order_item')


    def to_dict(self):
        return {
            'id': self.id,
            'item_amount': self.item_amount,
            'product_id': self.product_id,
            'order_id': self.order_id,
            'product': self.product.to_dict()
        }

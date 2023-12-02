from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    order_number = db.Column(db.String(255), nullable=False)
    shipping_method = db.Column(db.String(255), nullable=False)
    tracking_number = db.Column(db.String(255), nullable=False)
    shipped = db.Column(db.Boolean, default=False)
    address_order = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('addresses.id')), nullable=False)
    payment_order = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('payments.id')), nullable=False)
    date_ordered = db.Column(db.DateTime, default=datetime.utcnow)

    address = relationship('Address', back_populates='order')
    payment = relationship('Payment', back_populates='order')
    user = relationship('User', back_populates='order')
    order_item = relationship("Order_Item", back_populates='order')

    def to_dict(self):
        order_data = []
        for order_item in self.order_item:
            order_data.append(order_item.to_dict())
        return {
            'id': self.id,
            'user_id': self.user_id,
            'order_number': self.order_number,
            'shipping_method': self.shipping_method,
            'tracking_number': self.tracking_number,
            'shipped': self.shipped,
            'address_order': self.address_order,
            'payment_order': self.payment_order,
            'date_ordered': self.date_ordered,
            'order_item': order_data
        }

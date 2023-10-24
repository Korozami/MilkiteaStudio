from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Payment(db.Model):
    __tablename__ = 'payments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    card_number = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    expiration_date = db.Column(db.Date, nullable=False)
    security_code = db.Column(db.Integer, nullable=False)
    billing_address = db.Column(db.String(255), nullable=False)
    primary = db.Column(db.Boolean, default=False)

    user = relationship("User", back_populates='payment')
    order = relationship('Order', back_populates='payment')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_number': self.card_number,
            'name': self.name,
            'expiration_date': self.expiration_date,
            'security_code': self.security_code,
            'billing_address': self.billing_address,
            'primary': self.primary
        }

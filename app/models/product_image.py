from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Product_Image(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    image = db.Column(db.String(400))

    product = relationship("Product", back_populates='product_image')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'image': self.image
        }

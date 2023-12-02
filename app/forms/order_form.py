from flask_wtf import FlaskForm
from wtforms import BooleanField, StringField
from wtforms.validators import DataRequired


class OrderForm(FlaskForm):
    order_number = StringField('order_number', validators=[DataRequired()])
    shipping_method = StringField('shipping_method', validators=[DataRequired()])
    tracking_number = StringField('tracking_number')
    shipped = BooleanField('shipped')

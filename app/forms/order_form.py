from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField
from wtforms.validators import DataRequired


class OrderForm(FlaskForm):
    order_number = IntegerField('order_number', validators=[DataRequired()])
    tracking_number = IntegerField('tracking_number')
    shipped = BooleanField('shipped')

from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField, DateField
from wtforms.validators import DataRequired


class OrderForm(FlaskForm):
    order_number = IntegerField('order_number', validators=[DataRequired()])
    tracking_number = IntegerField('tracking_number')
    shipped = BooleanField('shipped', validators=[DataRequired()])
    date_ordered = DateField('date_ordered', validators=[DataRequired()])

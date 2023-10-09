from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class CartItemForm(FlaskForm):
    item_amount = IntegerField('item_amount', validators=[DataRequired()])

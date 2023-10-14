from flask_wtf import FlaskForm
from wtforms import TextAreaField, DecimalField, StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

def description_length(form, field):
    description = field.data

    if len(description) < 5:
        raise ValidationError("Your opinion must be more than 5 characters")

    if len(description) > 5000:
        raise ValidationError("Your description cannot be more than 5000 characters")


# def item_name_exist(form, field):
#     item_name = field.data
#     product = Product.query.filter(Product.item_name == item_name).first()
#     if product:
#         raise ValidationError('Product Name already exist')


class ProductForm(FlaskForm):
    item_name = StringField('item_name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired(), description_length])
    price = DecimalField('price', validators=[DataRequired()])
    category = StringField('category')
    quantity = IntegerField('quanitity', validators=[DataRequired()])
    hide = BooleanField('hide')
    display = BooleanField('display')

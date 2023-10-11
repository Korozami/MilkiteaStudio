from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError

def security_code(form, field):
    security_code = field.data

    if security_code > 9999:
        raise ValidationError('Please input the correct Security Code')


class PaymentForm(FlaskForm):
    card_number = IntegerField('card_number', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    expiration_date = DateField('expiration_date',format='%Y/%m', validators=[DataRequired()])
    security_code = IntegerField('security_code', validators=[DataRequired(), security_code])
    billing_address = StringField('billing_address', validators=[DataRequired()])

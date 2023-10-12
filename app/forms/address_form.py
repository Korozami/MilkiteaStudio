from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def zip(form, field):
    zip = field.data

    if zip > 99999:
        raise ValidationError('Please input a valid zip code')
    if zip < 1000:
        raise ValidationError('Please input a valid zip code')


class AddressForm(FlaskForm):
    city = StringField('city', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    zip = IntegerField('zip', validators=[DataRequired(), zip])

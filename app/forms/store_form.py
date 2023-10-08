from flask_wtf import FlaskForm
from wtforms import  BooleanField
from wtforms.validators import DataRequired, ValidationError

class StoreForm(FlaskForm):
    online = BooleanField('online', validators=[DataRequired()])

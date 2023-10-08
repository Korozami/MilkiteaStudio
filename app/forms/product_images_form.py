from flask_wtf import FlaskForm
from flask_uploads import UploadSet, IMAGES, configure_uploads
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ...app import app


photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)

class ProductImageForm(FlaskForm):
    images = FileField('photo', validators=[
        FileAllowed(photos, 'Only images are allowed'),
        FileRequired('File field should not be empty')
        ]
    )

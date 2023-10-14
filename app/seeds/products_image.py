from app.models import db, Product_Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    tote_bag = Product_Image(
        product_id=1,
        imageUrl="https://mikiproductimages.s3.us-west-2.amazonaws.com/Tote+bag+4.jpg"
    )


    db.session.add(tote_bag)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.opinions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product images"))

    db.session.commit()

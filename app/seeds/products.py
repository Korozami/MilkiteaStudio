from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    tote_bag = Product(
        store_id=1,
        item_name="Bath Bunni Take It Easy Tote Bag",
        description='A little reminder to take it easy! Bath Bunni Design printed on brushed cotton canvas material. This is quite a spacious bag, thanks to the wide gusset on the bottom! Comes with double handles, giving versatility when carrying. Dimensions: 14.5"W x 14.5"H x 8"D',
        price=40,
        category="Apparel",
        quantity=40,
        hide=False,
        display=True
    )
    star_catcher_sticker = Product(
        store_id=1,
        item_name="Star Catcher Sticker",
        description='This is a waterproof and weatherproof matte vinyl sticker. Dimensions: Approximately 2.1 x 2.4 Inches.',
        price=5,
        category="Sticker",
        quantity=40,
        hide=False,
        display=True
    )
    cats_corner_sticker = Product(
        store_id=1,
        item_name="Cat's Corner Cafe Sticker Sheet",
        description='This sticker sheet comes in two color/design ways, Grey and Pink. Use these stickers for some fun journaling, decorate your favorite water bottle, and more! Approximate size of 6 x 4.7 inches, this is a waterproof and weatherproof matte vinyl sticker sheet.',
        price=10,
        category="Sticker",
        quantity=40,
        hide=False
    )
    trio_sticker = Product(
        store_id=1,
        item_name="Pudding Bunni Trio Sticker",
        description='This is a waterproof and weatherproof matte vinyl sticker. Dimensions: Approximately 3.4 x 1.75 Inches.',
        price=5,
        category="Sticker",
        quantity=40,
        hide=False
    )

    db.session.add(tote_bag)
    db.session.add(star_catcher_sticker)
    db.session.add(cats_corner_sticker)
    db.session.add(trio_sticker)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.opinions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()

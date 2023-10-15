from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    tote_bag = Product(
        store_id=1,
        item_name="Bath Bunni Take It Easy Tote Bag",
        description='A little reminder to take it easy! Bath Bunni Design printed on brushed cotton canvas material. This is quite a spacious bag, thanks to the wide gusset on the bottom! Comes with double handles, giving versatility when carrying.',
        size='Dimensions: 14.5"W x 14.5"H x 8"D',
        price=40,
        category="Apparel",
        quantity=40,
        hide=False,
        display=True
    )
    star_catcher_sticker = Product(
        store_id=1,
        item_name="Star Catcher Sticker",
        description='This is a waterproof and weatherproof matte vinyl sticker.',
        size='Dimensions: Approximately 2.1 x 2.4 Inches.',
        price=5,
        category="Sticker",
        quantity=40,
        hide=False,
        display=True
    )
    cats_corner_sticker = Product(
        store_id=1,
        item_name="Cat's Corner Cafe Sticker Sheet",
        description='This sticker sheet comes in two color/design ways, Grey and Pink. Use these stickers for some fun journaling, decorate your favorite water bottle, and more! This is a waterproof and weatherproof matte vinyl sticker sheet.',
        size='Approximate size of 6 x 4.7 inches',
        price=10,
        category="Sticker",
        quantity=40,
        hide=False
    )
    trio_sticker = Product(
        store_id=1,
        item_name="Pudding Bunni Trio Sticker",
        description='This is a waterproof and weatherproof matte vinyl sticker.',
        size='Dimensions: Approximately 3.4 x 1.75 Inches.',
        price=5,
        category="Sticker",
        quantity=40,
        hide=False,
        display=True
    )
    dark_angel_twin = Product(
        store_id=1,
        item_name="Dark Angel Twin Bunni Sticker",
        description="This is a waterproof and weatherproof matte vinyl sticker.",
        size='Dimensions: Approximately 2.4 x 2.1 Inches.',
        price=5,
        category='Sticker',
        quantity=40,
        hide=False,
        display=True
    )
    crying_flower_bunni = Product(
        store_id=1,
        item_name="Crying Flower Bunni Sticker",
        description="This is a waterproof and weatherproof matte vinyl sticker.",
        size="Dimensions: Approximately 2.25 x 2 Inches.",
        price=5,
        category='Sticker',
        quantity=40,
        hide=False
    )
    bestie_bunni = Product(
        store_id=1,
        item_name="Besties Bunni Sticker",
        description="This is a glossy premium vinyl waterproof and weatherproof sticker.",
        size="Dimensions: Approximately 3 x 1.6 Inches.",
        price=5,
        category='Sticker',
        quantity=40,
        hide=False
    )
    lemon_bunni = Product(
        store_id=1,
        item_name="Lemon Bunni Print",
        description="Bunni's progression of taking a bite out of a lemon. . . This Lemon Bunni design is printed on thick card stock paper with a Linen textured finish.",
        size="Dimensions: Approximately 7.5 x 5.5 Inches",
        price=11,
        category="Print",
        quantity=50,
        hide=False,
        display=True
    )

    db.session.add(tote_bag)
    db.session.add(star_catcher_sticker)
    db.session.add(cats_corner_sticker)
    db.session.add(trio_sticker)
    db.session.add(dark_angel_twin)
    db.session.add(crying_flower_bunni)
    db.session.add(bestie_bunni)
    db.session.add(lemon_bunni)

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

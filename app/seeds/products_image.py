from app.models import db, Product_Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    tote_bag1 = Product_Image(
        product_id=1,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419229/samples/milkitea/Tote_bag_1_moiwa3.jpg"
    )
    tote_bag2 = Product_Image(
        product_id=1,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419227/samples/milkitea/Tote_bag_2_jlgrcy.jpg"
    )
    tote_bag3 = Product_Image(
        product_id=1,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419218/samples/milkitea/Tote_bag_3_zsgppy.jpg"
    )
    tote_bag4 = Product_Image(
        product_id=1,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419225/samples/milkitea/Tote_bag_4_10.51.54_PM_p32zmu.jpg"
    )
    star_catcher1 = Product_Image(
        product_id=2,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419241/samples/milkitea/Star_Catcher_1_pdeuh7.jpg"
    )
    star_catcher2 = Product_Image(
        product_id=2,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419244/samples/milkitea/Star_Catcher_2_k6f9kd.jpg"
    )
    cat_corner1= Product_Image(
        product_id=3,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419217/samples/milkitea/Cat_s_Corner_Cafe_Grey_Sticker_Sheet_2_xyfujy.jpg"
    )
    cat_corner2 = Product_Image(
        product_id=3,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419240/samples/milkitea/Cat_s_Corner_Cafe_Grey_Sticker_Sheet_1_rmpcc2.jpg"
    )
    trio_sticker1 = Product_Image(
        product_id=4,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419237/samples/milkitea/Pudding_Trio_1_ddoplc.jpg"
    )
    trio_sticker2 = Product_Image(
        product_id=4,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419225/samples/milkitea/Pudding_Trio_2_mscdij.jpg"
    )
    dark_angel1 = Product_Image(
        product_id=5,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419218/samples/milkitea/Dark_Angel_Twins_Sticker_b5qaxi.jpg"
    )
    dark_angel2 = Product_Image(
        product_id=5,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419239/samples/milkitea/Dark_Angel_Twins_2_xqrfkz.jpg"
    )
    dark_angel3 = Product_Image(
        product_id=5,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419217/samples/milkitea/Dark_Angel_Twins_1_wpkcz6.jpg"
    )
    crying_flower1 = Product_Image(
        product_id=6,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419224/samples/milkitea/Crying_Flower_Bunni_1_fc4llh.jpg"
    )
    crying_flower2 = Product_Image(
        product_id=6,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419245/samples/milkitea/Crying_Flower_Bunni_2_otas1e.jpg"
    )
    bestie_bunni1 = Product_Image(
        product_id=7,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419230/samples/milkitea/Besties_1_v3gjbx.jpg"
    )
    bestie_bunni2 = Product_Image(
        product_id=7,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419233/samples/milkitea/Besties_2_fqbowd.jpg"
    )
    lemon_bunni1 = Product_Image(
        product_id=8,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419237/samples/milkitea/Lemon_Bunni_Print_1_1_gyzwnf.jpg"
    )
    lemon_bunni2 = Product_Image(
        product_id=8,
        imageUrl="https://res.cloudinary.com/dfv1zpur7/image/upload/v1697419220/samples/milkitea/Lemon_Bunni_Print_u0g9ke.jpg"
    )

    db.session.add(tote_bag1)
    db.session.add(tote_bag2)
    db.session.add(tote_bag3)
    db.session.add(tote_bag4)
    db.session.add(star_catcher1)
    db.session.add(star_catcher2)
    db.session.add(cat_corner1)
    db.session.add(cat_corner2)
    db.session.add(trio_sticker1)
    db.session.add(trio_sticker2)
    db.session.add(dark_angel1)
    db.session.add(dark_angel2)
    db.session.add(dark_angel3)
    db.session.add(crying_flower1)
    db.session.add(crying_flower2)
    db.session.add(bestie_bunni1)
    db.session.add(bestie_bunni2)
    db.session.add(lemon_bunni1)
    db.session.add(lemon_bunni2)


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

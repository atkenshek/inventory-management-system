from flask import Flask, request, render_template, jsonify
from google.cloud import storage
import psycopg2
from flask_cors import CORS
from psycopg2.extras import RealDictCursor
import os
import uuid

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


# Google Cloud Storage configuration
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/meiramsopy/Desktop/cloud-final/backend/service-account-key.json" 
BUCKET_NAME = "inventory-app-bucket"

# PostgreSQL configuration for Google Cloud SQL
DB_HOST = "35.232.60.71" 
DB_NAME = "inventory-app-psql"
DB_USER = "postgres"
DB_PASSWORD = "makishev_02"
DB_PORT = 5432 

# Initialize Google Cloud Storage client
def initialize_storage_client():
    client = storage.Client()  # Uses the GOOGLE_APPLICATION_CREDENTIALS environment variable
    return client

# Connect to PostgreSQL database (Google Cloud SQL)
def connect_to_cloud_sql():
    postgresql_conn = psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )
    return postgresql_conn

# Upload image to Cloud Storage
def upload_image(file):
    client = storage.Client()
    bucket = client.bucket(BUCKET_NAME)
    blob = bucket.blob(f"product-images/{uuid.uuid4()}-{file.filename}")
    blob.upload_from_file(file)
    # Do not call `blob.make_public()`
    return f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}" 

@app.route("/api/products", methods=["GET"])
def get_products():
    conn = connect_to_cloud_sql()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Product")
    products = cursor.fetchall()
    cursor.close()
    return jsonify(products)

@app.route("/api/users", methods=["GET"])
def get_users():
    conn = connect_to_cloud_sql()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM Users")
    users = cursor.fetchall()
    cursor.close()
    return jsonify(users)

# Add a new product
@app.route("/api/product", methods=["POST"])
def add_product():
    data = request.form
    file = request.files.get("image")
    image_url = upload_image(file) if file else None

    query = """
        INSERT INTO Product (name, description, quantity, price, location_id, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, NOW(), NOW()) RETURNING id
    """
    values = (data["name"], data["description"], data["quantity"], data["price"], data["location_id"])
    conn = connect_to_cloud_sql()
    cursor = conn.cursor()
    cursor.execute(query, values)
    product_id = cursor.fetchone()[0]

    # Update product image URL in the database
    if image_url:
        cursor.execute("UPDATE Product SET image_url = %s WHERE id = %s", (image_url, product_id))

    conn.commit()
    cursor.close()
    return jsonify({"message": "Product added successfully!", "id": product_id})

# Update a product
@app.route("/api/product/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.form
    file = request.files.get("image")
    image_url = upload_image(file) if file else None

    query = """
        UPDATE Product
        SET name = %s, description = %s, quantity = %s, price = %s, location_id = %s, updated_at = NOW()
        WHERE id = %s
    """
    values = (data["name"], data["description"], data["quantity"], data["price"], data["location_id"], product_id)
    conn = connect_to_cloud_sql()
    cursor = conn.cursor()
    cursor.execute(query, values)

    # Update product image URL if a new image is provided
    if image_url:
        cursor.execute("UPDATE Product SET image_url = %s WHERE id = %s", (image_url, product_id))

    conn.commit()
    cursor.close()
    return jsonify({"message": "Product updated successfully!"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)

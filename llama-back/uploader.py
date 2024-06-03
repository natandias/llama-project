# Set your Cloudinary credentials
# ==============================
import json
import cloudinary.api
import cloudinary.uploader
from cloudinary import CloudinaryImage
import cloudinary
from dotenv import load_dotenv
load_dotenv()

# Import the Cloudinary libraries
# ==============================

# Import to format the JSON responses
# ==============================

# Set configuration parameter: return "https" URLs by setting secure=True
# ==============================
config = cloudinary.config(secure=True)


def uploadImage(image, imageName):
  # Upload the image and get its URL
  # ==============================

  # Upload the image.
  # Set the asset's public ID and allow overwriting the asset with new versions
  result = cloudinary.uploader.upload(image,
                                      public_id=imageName, folder='Intellimaker', unique_filename=True, overwrite=True)

  # Build the URL for the image and save it in the variable 'srcURL'
  srcURL = result.get('secure_url')

  # Log the image URL to the console.
  # Copy this URL in a browser tab to generate the image on the fly.
  print("****2. Upload an image****\nDelivery URL: ", srcURL, "\n")
  return srcURL

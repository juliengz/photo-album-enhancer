terraform {
  required_version = ">= 0.14"

  required_providers {
    # Cloud Run support was added on 3.3.0
    google = ">= 3.3"
  }
}

# Google provider configuration.
provider "google" {
  project     = var.gcp_project
  region      = var.gcp_region
}

# Custom role allowed to GET objects from buckets
resource "google_project_iam_custom_role" "storage-noauth" {
  role_id     = "storage.objectView"
  title       = "Storage Object View Only"
  permissions = ["storage.objects.get"]
}

# Policy attaching the custom role "storage-noauth" to all users
data "google_iam_policy" "storage-noauth" {
  binding {
    role    = google_project_iam_custom_role.storage-noauth.id
    members = [
      "allUsers",
    ]
  }
}

# Bucket for storing the videos
resource "google_storage_bucket" "assets" {
  name          = var.gcp_bucket_assets
  location      = var.gcp_location
  project       = var.gcp_project
  force_destroy = true

  uniform_bucket_level_access = true
}

# Attach the policy "storage-noauth" to the videos bucket.
# It allows any user to access the files in it if they have the correct url.
resource "google_storage_bucket_iam_policy" "assets-acl" {
  bucket      = google_storage_bucket.assets.name
  policy_data = data.google_iam_policy.storage-noauth.policy_data
}

# Declare the API credentials file in the Secret Manager
resource "google_secret_manager_secret" "api-gcp-key-file" {
  secret_id = "api-gcp-key-file"
  replication {
    automatic = true
  }
}

# Store the API credentials file in the Secret Manager
resource "google_secret_manager_secret_version" "api-gcp-key-file-version" {
  secret      = google_secret_manager_secret.api-gcp-key-file.id
  secret_data = file(var.gcp_api_key_file)
}

# output "service_url" {
#   value = google_cloud_run_service.run_service.status[0].url
# }

variable "gcp_project" {
  type        = string
  description = "GCP project name"
  default = "photo-album-enhancer"
}

variable "gcp_region" {
  type        = string
  description = "GCP region"
  default     = "europe-west1"
}

variable "gcp_location" {
  type        = string
  description = "GCP location"
  default     = "EU"
}

# variable "gcp_auth_file" {
#   type        = string
#   description = "GCP authentication file for terraform"
# }

variable "gcp_bucket_assets" {
  type        = string
  description = "The id of the bucket for the assets"
  default     = "photo-album-enhancer-assets"
}

variable "gcp_api_key_file" {
  type        = string
  description = "GCP authentication file for accessing buckets from the API"
  default     = ".gcp_api_key_file"
}
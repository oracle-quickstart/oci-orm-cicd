# Copyright (c) 2020 Oracle and/or its affiliates.

# Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.

variable "compartment_ocid" {
  default = "ocid1.compartment.oc1..uniqueid"
}

variable "region" {
  default = "us-phoenix-1"
}

variable "imageOCID" {
  default = "image"
}

# Defines the number of instances to deploy
variable "NumInstances" {
  default = "1"
}

variable "InstanceShape" {
  default = "VM.Standard2.1"
}

# Specifies the Availability Domain
variable "localAD" {
  default = "<AD_name>"
}


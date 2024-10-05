import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  docstorage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectid);
    this.databases = new Databases(this.client);
    this.docstorage = new Storage(this.client);
  }

  async addDoctor({
    docname,
    speciality,
    joiningdate,
    featuredimage,
    available,
    userId,
  }) {
    try {
      const uniqueDocid = ID.unique();

      return await this.databases.createDocument(
        conf.appwriteDatabaseid,
        conf.appwriteDocCollectionid,
        uniqueDocid,
        {
          docname,
          speciality,
          joiningdate,
          featuredimage,
          available,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: adddoctor :: error", error);
    }
  }

  async addPatient({
    name,
    docname,
    appointmentdate,
    age,
    address,
    mobileno,
    appointmentstatus,
    userId,
  }) {
    try {
      const uniquePatientid = ID.unique();

      return await this.databases.createDocument(
        conf.appwriteDatabaseid,
        conf.appwritePatientsCollectionid,
        uniquePatientid,
        {
          name,
          docname,
          appointmentdate,
          age,
          address,
          mobileno,
          appointmentstatus,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: addpatient :: error", error);
    }
  }

  async updateDoctorData(
    uniqueDocid,
    { docname, speciality, featuredimage, available }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseid,
        conf.appwriteDocCollectionid,
        uniqueDocid,
        {
          docname,
          speciality,
          featuredimage,
          available,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatedoctordata :: error", error);
    }
  }

  async updatePatientStatus(patientId, appointmentstatus) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseid,
        conf.appwritePatientsCollectionid,
        patientId,
        {
          appointmentstatus,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatepatientstatus :: error", error);
    }
  }

  async deleteDoctordata(uniqueDocid) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseid,
        conf.appwriteDocCollectionid,
        uniqueDocid
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletedoctor :: error", error);
      return false;
    }
  }

  async getDoctorDetail(uniqueDocid) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseid,
        conf.appwriteDocCollectionid,
        uniqueDocid
      );
    } catch (error) {
      console.log("Appwrite service :: getdoctordetails :: error", error);
    }
  }

  async getAllDoctors(queries = [], userId) {
    try {
      const combinedQueries = [
        ...queries,
        Query.equal("available", "active"),
        Query.equal("userId", userId),
      ];
      return await this.databases.listDocuments(
        conf.appwriteDatabaseid,
        conf.appwriteDocCollectionid,
        combinedQueries
      );
    } catch (error) {
      console.log("Appwrite service :: getdoctordetails :: error", error);
    }
  }

  async getPatientDetails(uniquePatientid) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseid,
        conf.appwritePatientsCollectionid,
        uniquePatientid
      );
    } catch (error) {
      console.log("Appwrite service :: getpatientdetails :: error", error);
    }
  }

  async getTodayPatients(queries = [], userId) {
    try {
      const today = new Date().toISOString().split("T")[0];

      const combinedQueries = [
        ...queries,
        Query.equal("appointmentstatus", ["booked", "completed", "cancled"]),
        Query.equal("appointmentdate", today),
        Query.equal("userId", userId),
      ];

      return await this.databases.listDocuments(
        conf.appwriteDatabaseid,
        conf.appwritePatientsCollectionid,
        combinedQueries
      );
    } catch (error) {
      console.log("Appwrite service :: getPatientsdetails :: error", error);
    }
  }

  async getAllPatientsOfDate(queries = [], userId, date) {
    try {
      const combinedQueries = [
        ...queries,
        Query.equal("appointmentstatus", ["booked", "completed", "cancled"]),
        Query.equal("appointmentdate", date),
        Query.equal("userId", userId),
      ];
      return await this.databases.listDocuments(
        conf.appwriteDatabaseid,
        conf.appwritePatientsCollectionid,
        combinedQueries
      );
    } catch (error) {
      console.log("Appwrite service :: getAllPatientsOfDate :: error", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.docstorage.createFile(
        conf.appwriteDocBucketid,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadfile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.docstorage.deleteFile(conf.appwriteDocBucketid, fileId);
    } catch (error) {
      console.log("Appwrite service :: deletefile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.docstorage.getFilePreview(conf.appwriteDocBucketid, fileId);
  }
}

const service = new Service();

export default service;

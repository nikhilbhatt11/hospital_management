const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteDocCollectionid: String(
    import.meta.env.VITE_APPWRITE_DOC_COLLECTION_ID
  ),
  appwritePatientsCollectionid: String(
    import.meta.env.VITE_APPWRITE_PATIENTS_COLLECTION_ID
  ),
  appwriteDocBucketid: String(import.meta.env.VITE_APPWRITE_DOC_BUCKET_ID),
  appwritePatientsBucketid: String(
    import.meta.env.VITE_APPWRITE_PATIENTS_BUCKET_ID
  ),
};

export default conf;

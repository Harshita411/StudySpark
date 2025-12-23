# MongoDB Database Schema

**Database Name:** `studyAssistantDB`

---

### `users` Collection

Stores user information.

-   `_id`: `ObjectId` (Primary Key)
-   `username`: `String` (Unique)
-   `email`: `String` (Unique)
-   `password`: `String` (Hashed)
-   `_class`: `String` (e.g., "com.aiassistant.studyassistant.model.User")

**Example:**
```json
{
  "_id": ObjectId("675a6f2b..."),
  "username": "testuser",
  "email": "test@example.com",
  "password": "hashed_password_string"
}
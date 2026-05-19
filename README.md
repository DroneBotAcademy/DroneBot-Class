# Drone-Class

ระบบจัดการคลาสเรียนของ DroneBot Thailand สำหรับดูตารางเรียน จัดการนักเรียน จัดการคอร์ส ติดตามความคืบหน้า และจัดการข้อมูลพนักงาน โดยโปรเจกต์นี้เป็นเว็บแบบ Static HTML/CSS/JavaScript ที่เชื่อมต่อฐานข้อมูลผ่าน Google Apps Script Web App

## ภาพรวมระบบ

Drone-Class แบ่งการใช้งานหลักออกเป็น 2 ส่วน

1. ระบบผู้ใช้งานทั่วไป
   - เข้าสู่ระบบผ่าน `Login.html`
   - ดู Dashboard และกิจกรรมประจำวัน/สัปดาห์/ทั้งหมด
   - ดูและจัดการ Schedule
   - ค้นหา เพิ่ม และแก้ไขข้อมูลนักเรียน
   - จัดการ Course Class และ Regular Class
   - ดูข้อมูลพนักงาน และแก้ไขข้อมูลของตนเอง

2. ระบบ Admin
   - เข้าสู่ระบบผ่าน `admin/adminlog.html`
   - Dashboard สำหรับดูและจัดการกิจกรรมรายเดือน
   - จัดการนักเรียน
   - จัดการคลาสเรียนทั้ง Course Class และ Regular Class
   - จัดการพนักงาน เช่น เพิ่ม แก้ไข ลบ และกำหนด role

ข้อมูลหลักถูกดึง/บันทึกผ่าน Google Apps Script ที่กำหนดไว้ใน `js/config.js`

```js
const scriptURL = "Google Apps Script Web App URL";
const authScriptURL = scriptURL;
const API_URL = scriptURL;
```

## เทคโนโลยีที่ใช้

- HTML5 สำหรับโครงสร้างหน้าเว็บ
- CSS3 สำหรับการตกแต่ง UI
- JavaScript แบบ Vanilla สำหรับ logic ทั้งหมด
- Tailwind CSS ผ่าน CDN ในหน้าผู้ใช้งานทั่วไป
- Bootstrap 5 ในหน้า Admin
- Font Awesome สำหรับไอคอนในหน้าผู้ใช้งานทั่วไป
- Bootstrap Icons/SVG Symbols สำหรับหน้า Admin
- Google Fonts: Kanit
- Google Apps Script Web App สำหรับ API และเชื่อมต่อข้อมูล
- Google Calendar Embed สำหรับแสดงปฏิทินใน Dashboard/Schedule

## โครงสร้างไฟล์

```text
Drone-Class/
|-- Home.html                    # Dashboard ฝั่งผู้ใช้งานทั่วไป
|-- Login.html                   # หน้า Login ฝั่งผู้ใช้งานทั่วไป
|-- Schedule.html                # หน้า Schedule และจัดการกิจกรรม
|-- Student.html                 # หน้ารายชื่อนักเรียนทั้งหมด
|-- Class-course.html            # หน้า Course Class
|-- Class-regular.html           # หน้า Regular Class
|-- employees.html               # หน้า Employees ฝั่งผู้ใช้งานทั่วไป
|-- index.html                   # ไฟล์ว่างในปัจจุบัน
|-- Profile.html                 # ไฟล์ว่างในปัจจุบัน
|-- admin/
|   |-- adminlog.html            # Login ของ Admin
|   |-- adminpage.html           # Dashboard ของ Admin
|   |-- adminclass.html          # จัดการ Class ฝั่ง Admin
|   |-- adminstudent.html        # จัดการ Student ฝั่ง Admin
|   |-- admin-employees.html     # จัดการ Employee ฝั่ง Admin
|   |-- admin-common.js          # โหลด shell, navbar, theme ของ Admin
|   |-- admin-navbar.html        # Sidebar menu ของ Admin
|   |-- admin-header.html        # Header ของ Admin
|   `-- admin-icons.html         # SVG icons ของ Admin
|-- css/
|   |-- style.css                # Style หน้า Login/main user
|   |-- dashboard.css            # Layout dashboard/admin shell
|   |-- adminclass.css           # Style หน้า admin class
|   `-- sign-inadmin.css         # Style หน้า admin login
|-- js/
|   |-- config.js                # ตั้งค่า URL ของ Google Apps Script
|   |-- auth-guard.js            # ตรวจ login ฝั่ง user
|   |-- main-navbar.js           # Sidebar/Navbar ฝั่ง user
|   |-- adminclass.js            # Guard บางส่วนของหน้า admin class
|   `-- dashboard.js             # Chart demo สำหรับ dashboard template
|-- assets/                      # Bootstrap local assets
|-- image/                       # Logo และรูปภาพ
`-- icon/                        # ไอคอนของโปรเจกต์
```

## การติดตั้งและการรัน

โปรเจกต์นี้ไม่มี `package.json` และไม่มีขั้นตอน build สามารถรันเป็น static website ได้ทันที

วิธีแนะนำ:

1. เปิดโฟลเดอร์โปรเจกต์ใน VS Code
2. ใช้ Extension เช่น Live Server
3. เปิด `Login.html` สำหรับระบบผู้ใช้ทั่วไป
4. เปิด `admin/adminlog.html` สำหรับระบบ Admin

หรือใช้ local server ด้วย Python:

```bash
python -m http.server 5500
```

จากนั้นเข้าใช้งานผ่าน browser:

```text
http://localhost:5500/Login.html
http://localhost:5500/admin/adminlog.html
```

ควรรันผ่าน local server แทนการเปิดไฟล์แบบ `file://` เพราะหน้า Admin มีการ `fetch()` เพื่อโหลด component เช่น `admin-header.html`, `admin-navbar.html` และ `admin-icons.html`

## การตั้งค่า Backend/API

ไฟล์สำคัญคือ `js/config.js`

```js
const scriptURL = ".../exec";
const authScriptURL = scriptURL;
const API_URL = scriptURL;
```

ตัวแปรที่ใช้:

- `scriptURL` ใช้กับ request หลักของระบบ เช่น student, class, schedule, employee
- `authScriptURL` ใช้กับ login ฝั่ง user
- `API_URL` ใช้ในหน้า employees บางส่วน

หลังเปลี่ยน Google Apps Script deployment URL ให้แก้ที่ไฟล์นี้เป็นหลัก เพื่อให้ทุกหน้าที่ import `config.js` ใช้ endpoint เดียวกัน

หมายเหตุ: `admin/adminlog.html` มี URL สำหรับ login ของ Admin hard-code แยกอยู่ในไฟล์นั้น หากเปลี่ยน endpoint ของระบบ login admin ต้องตรวจจุดนี้ด้วย

## ระบบ Authentication

### ฝั่งผู้ใช้งานทั่วไป

ไฟล์ที่เกี่ยวข้อง:

- `Login.html`
- `js/auth-guard.js`
- `js/main-navbar.js`

Flow การทำงาน:

1. ผู้ใช้กรอก email และ password ใน `Login.html`
2. ระบบเรียก API แบบ GET ไปยัง `authScriptURL`

```text
?action=login&user=<email>&pass=<password>
```

3. ถ้าสำเร็จ API ต้องตอบกลับประมาณนี้

```json
{
  "status": "success",
  "user": "ชื่อผู้ใช้",
  "role": "admin",
  "email": "user@example.com"
}
```

4. ระบบบันทึกข้อมูลลง `localStorage` ด้วย key `userData`
5. `auth-guard.js` จะตรวจว่ามี `userData` หรือไม่
6. ถ้ายังไม่ login และเข้าหน้าภายใน ระบบจะ redirect ไป `Login.html?message=please_login`
7. ถ้า login แล้วและกลับไปหน้า login ระบบจะ redirect ไป `Home.html`

ข้อมูลที่เก็บใน browser:

```json
{
  "user": "ชื่อผู้ใช้",
  "role": "admin",
  "email": "user@example.com"
}
```

### ฝั่ง Admin

ไฟล์ที่เกี่ยวข้อง:

- `admin/adminlog.html`
- `admin/admin-common.js`
- หน้า admin ต่าง ๆ ที่ตรวจ `sessionStorage`

Flow การทำงาน:

1. Admin login ผ่าน `admin/adminlog.html`
2. เมื่อ login สำเร็จ ระบบบันทึก:

```js
sessionStorage.setItem("isLoggedIn", "true");
sessionStorage.setItem("userFullName", data.user);
```

3. หน้า Admin จะตรวจ `sessionStorage.getItem("isLoggedIn")`
4. ถ้าไม่มีค่า `"true"` จะ redirect กลับไป `adminlog.html`
5. ปุ่ม Sign out ใน `admin-navbar.html` จะล้าง `sessionStorage` และ `localStorage`

## หน้าผู้ใช้งานทั่วไป

### `Login.html`

หน้าสำหรับเข้าสู่ระบบผู้ใช้งานทั่วไป

ความสามารถ:

- กรอก email/password
- ซ่อน/แสดง password
- เรียก API login
- เก็บข้อมูลผู้ใช้ใน `localStorage`
- แสดงข้อความเมื่อยังไม่ได้ login แล้วถูก redirect กลับมา

### `Home.html`

Dashboard หลัง login

ความสามารถ:

- แสดงชื่อผู้ใช้จาก `localStorage.userData`
- แสดงวันที่ปัจจุบัน
- แสดงกิจกรรมตามมุมมอง:
  - Today
  - This Week
  - All
- เรียก API `getActivities`

Payload:

```json
{
  "action": "getActivities",
  "view": "day"
}
```

### `Schedule.html`

หน้าจัดการตารางกิจกรรม

ความสามารถ:

- แสดง Google Calendar embed
- แสดง summary ของกิจกรรมวันนี้
- เพิ่ม event
- แก้ไข event
- ลบ event
- reload calendar iframe หลังแก้ไขข้อมูล

API actions ที่ใช้:

- `getActivities`
- `addEvent`
- `updateEvent`
- `deleteEvent`

ตัวอย่าง payload เพิ่ม/แก้ไข event:

```json
{
  "action": "addEvent",
  "data": {
    "title": "ชื่อกิจกรรม",
    "date": "2026-05-16",
    "startTime": "10:00",
    "endTime": "12:00",
    "location": "DroneBot Thailand"
  }
}
```

### `Student.html`

หน้ารายชื่อนักเรียนทั้งหมด

ความสามารถ:

- โหลดนักเรียนจากทั้ง Course Class และ Regular Class
- รวมรายชื่อและตัดข้อมูลซ้ำด้วย `studentId`
- ค้นหานักเรียนด้วย `searchStudents`
- เปิด modal ดูรายละเอียดนักเรียน
- แก้ไขข้อมูลนักเรียน
- เพิ่มนักเรียนใหม่
- เลือกประเภทนักเรียนเป็น Course หรือ Regular
- ถ้าเป็น Course สามารถเลือก course ที่ต้องการผูกกับนักเรียนได้

API actions ที่ใช้:

- `searchStudents`
- `getStudentsByType`
- `getCourseData`
- `updateStudent`
- `addStudent`
- `addStudentWithCourse`

ข้อมูลนักเรียนที่หน้าระบบใช้:

```json
{
  "studentId": "ST001",
  "name": "ชื่อไทย",
  "nickname": "ชื่อเล่น",
  "nameEng": "English Name",
  "nicknameEng": "English Nickname",
  "phone": "เบอร์โทร",
  "type": "Course"
}
```

### `Class-course.html`

หน้าจัดการ Course Class

ความสามารถ:

- โหลดรายชื่อคอร์ส
- filter นักเรียนตาม course
- ค้นหานักเรียน
- เพิ่ม course ใหม่
- เพิ่มนักเรียนเข้า course
- ดึงข้อมูลนักเรียนเดิมมาเติมอัตโนมัติเมื่อชื่อซ้ำ
- อัปเดต progress การเรียนแบบ 6 sessions
- กดจบหลักสูตรทันทีโดยตั้ง progress เป็น 6
- ลบนักเรียนออกจาก course enrollment

API actions ที่ใช้:

- `getCourseData`
- `getStudentsByType`
- `addNewCourse`
- `addStudent`
- `updateProgress`
- `deleteEnrollment`

Progress ของ Course Class:

- ใช้จำนวน session ทั้งหมด 6 ครั้ง
- ค่า `progress` ตั้งแต่ 0 ถึง 6
- ถ้า `progress >= 6` ถือว่าเรียนครบหลักสูตร

### `Class-regular.html`

หน้าจัดการ Regular Class

ความสามารถ:

- โหลดรายชื่อครูผู้สอน
- โหลดนักเรียน Regular Class
- filter ตามครูผู้สอน
- ค้นหาด้วยชื่อนักเรียน
- อัปเดต progress แบบ 4 sessions
- บันทึกหัวข้อที่เรียนรายสัปดาห์
- บันทึกครูผู้สอนในแต่ละ session
- เพิ่มนักเรียนเข้า Regular Class จากนักเรียนเดิม หรือสร้างนักเรียนใหม่
- ลบนักเรียนออกจาก Regular Class

API actions ที่ใช้:

- `getInstructors`
- `getStudentCoursesRegular`
- `getStudentsByType`
- `addStudent`
- `addStudentToCourseRegular`
- `getAllStudents`
- `updateWeekAndInstructor`
- `updateProgressRegular`
- `deleteEnrollmentRegular`

Progress ของ Regular Class:

- ใช้จำนวน session ทั้งหมด 4 ครั้ง
- เก็บหัวข้อเรียนใน `weeks`
- เก็บครูผู้สอนแต่ละ session ใน `instructorsWeek`

### `employees.html`

หน้าข้อมูลพนักงานสำหรับฝั่งผู้ใช้งานทั่วไป

ความสามารถ:

- โหลดรายชื่อพนักงาน
- แสดง role เช่น Admin, Manager หรือ Guest
- แสดงสถิติพนักงาน
- ผู้ใช้สามารถแก้ไขข้อมูลของตนเองได้
- แก้ไขชื่อ เบอร์โทร และ password

API actions ที่ใช้:

- `getUsers`
- `updateUser`

ข้อสังเกต:

- หน้านี้ให้แก้ไขเฉพาะข้อมูลของ user ที่ email ตรงกับ `localStorage.userData.email`
- การจัดการพนักงานเต็มรูปแบบจะอยู่ในฝั่ง Admin

## ระบบ Admin

หน้า Admin ใช้ Bootstrap 5 เป็นหลัก และโหลด layout กลางผ่าน `admin/admin-common.js`

Component กลาง:

- `admin-icons.html` สำหรับ SVG symbols
- `admin-header.html` สำหรับ top navbar
- `admin-navbar.html` สำหรับ sidebar
- theme toggle สำหรับ light/dark/auto

### `admin/adminlog.html`

หน้า login ของ Admin

ความสามารถ:

- กรอก email/password
- เรียก API login
- บันทึก session ลง `sessionStorage`
- redirect ไป `adminpage.html`

ข้อสังเกต:

- endpoint login admin ถูก hard-code ในไฟล์นี้ ไม่ได้ใช้ `js/config.js` โดยตรง

### `admin/adminpage.html`

Dashboard ของ Admin

ความสามารถ:

- โหลดกิจกรรมทั้งหมดจาก API
- กรองกิจกรรมตามเดือน
- เลื่อนเดือนก่อนหน้า/ถัดไป
- กลับไปเดือนปัจจุบัน
- แสดง Google Calendar iframe
- เพิ่ม event
- แก้ไข event
- ลบ event

API actions ที่ใช้:

- `getActivities`
- `addEvent`
- `updateEvent`
- `deleteEvent`

### `admin/adminstudent.html`

หน้าจัดการนักเรียนของ Admin

ความสามารถ:

- โหลดนักเรียนจาก Course และ Regular
- แสดงรายชื่อนักเรียนรวม
- แก้ไขข้อมูลนักเรียน
- เพิ่มนักเรียนใหม่
- เลือกประเภทนักเรียน
- ถ้าเป็น Course สามารถเลือก course ได้

API actions ที่ใช้:

- `getStudentsByType`
- `updateStudent`
- `getCourseData`
- `addStudent`
- `addStudentWithCourse`

### `admin/adminclass.html`

หน้าจัดการคลาสของ Admin รวม Course Class และ Regular Class

ส่วน Course Class:

- โหลดรายชื่อ course
- filter ตาม course
- ค้นหานักเรียน
- เพิ่ม course
- เพิ่มนักเรียน
- update progress 6 sessions
- ลบ enrollment ออกจาก course

ส่วน Regular Class:

- โหลดรายชื่อครู
- โหลดรายชื่อนักเรียน Regular
- filter ตามครู
- update progress 4 sessions
- บันทึกหัวข้อรายสัปดาห์
- บันทึกครูผู้สอนราย session
- เพิ่มนักเรียนเข้า Regular
- ลบ enrollment

API actions ที่ใช้:

- `getCourseData`
- `getStudentsByType`
- `updateProgress`
- `deleteEnrollment`
- `addNewCourse`
- `addStudent`
- `getInstructors`
- `getStudentCoursesRegular`
- `updateWeekAndInstructor`
- `updateProgressRegular`
- `deleteEnrollmentRegular`
- `addStudentToCourseRegular`
- `getAllStudents`

### `admin/admin-employees.html`

หน้าจัดการพนักงานของ Admin

ความสามารถ:

- โหลดรายชื่อพนักงานทั้งหมด
- ค้นหาจากชื่อ email หรือเบอร์โทร
- filter ตาม role
- แสดงจำนวนพนักงานรวม จำนวน admin และ manager
- เพิ่มพนักงานใหม่
- แก้ไขพนักงาน
- เปลี่ยน role
- เปลี่ยน password
- ลบพนักงาน

API actions ที่ใช้:

- `getUsers`
- `addUser`
- `updateUser`
- `deleteUser`

ข้อมูล employee/user ที่ระบบใช้:

```json
{
  "email": "admin@example.com",
  "fullName": "Admin Name",
  "phone": "0812345678",
  "role": "admin",
  "password": "password"
}
```

## รายการ API actions ที่ระบบคาดหวัง

Google Apps Script ควรรองรับ actions เหล่านี้

### Authentication

- `login`

### Activities / Schedule

- `getActivities`
- `addEvent`
- `updateEvent`
- `deleteEvent`

### Students

- `searchStudents`
- `getStudentsByType`
- `getAllStudents`
- `addStudent`
- `addStudentWithCourse`
- `updateStudent`

### Course Class

- `getCourseData`
- `addNewCourse`
- `updateProgress`
- `deleteEnrollment`

### Regular Class

- `getInstructors`
- `getStudentCoursesRegular`
- `addStudentToCourseRegular`
- `updateWeekAndInstructor`
- `updateProgressRegular`
- `deleteEnrollmentRegular`

### Users / Employees

- `getUsers`
- `addUser`
- `updateUser`
- `deleteUser`

รูปแบบ response ที่หน้าเว็บส่วนใหญ่คาดหวัง:

```json
{
  "status": "success",
  "data": []
}
```

หรือเมื่อเกิดข้อผิดพลาด:

```json
{
  "status": "error",
  "message": "รายละเอียดข้อผิดพลาด"
}
```

## โมเดลข้อมูลโดยสรุป

### Student

```json
{
  "studentId": "ST001",
  "name": "ชื่อไทย",
  "nickname": "ชื่อเล่น",
  "age": "12",
  "nameEng": "English Name",
  "nicknameEng": "English Nickname",
  "phone": "0812345678",
  "type": "Course"
}
```

### Course

```json
{
  "id": "COURSE001",
  "name": "Drone Beginner Course"
}
```

### Course Enrollment

```json
{
  "studentId": "ST001",
  "courseId": "COURSE001",
  "courseName": "Drone Beginner Course",
  "progress": 3
}
```

### Regular Enrollment

```json
{
  "studentId": "ST001",
  "courseId": "",
  "name": "Student Name",
  "progress": 2,
  "weeks": ["บทที่ 1", "บทที่ 2", "", ""],
  "instructorsWeek": ["Teacher A", "Teacher B", "", ""]
}
```

### Activity/Event

```json
{
  "eventId": "EV001",
  "title": "Class Activity",
  "date": "16 May 2026",
  "startTime": "10:00",
  "endTime": "12:00",
  "location": "DroneBot Thailand"
}
```

### User/Employee

```json
{
  "email": "user@example.com",
  "fullName": "User Name",
  "phone": "0812345678",
  "role": "admin"
}
```

## Navigation

### User navigation

สร้างจาก `js/main-navbar.js`

เมนูหลัก:

- Dashboard -> `Home.html`
- Schedule -> `Schedule.html`
- Students -> `Student.html`
- Class
  - Course Class -> `Class-course.html`
  - Regular Class -> `Class-regular.html`
- Employees -> `employees.html`
- Admin Panel -> แสดงเฉพาะเมื่อ `role` เป็น `admin`
- Logout -> ล้าง `localStorage.userData` และกลับไป `Login.html`

### Admin navigation

สร้างจาก `admin/admin-navbar.html` และโหลดผ่าน `admin/admin-common.js`

เมนูหลัก:

- Dashboard -> `adminpage.html`
- Class -> `adminclass.html`
- Students -> `adminstudent.html`
- Employees -> `admin-employees.html`
- Sign out -> ล้าง session และกลับไป `adminlog.html`

## Theme และ UI

### ฝั่ง user

- ใช้ Tailwind CSS ผ่าน CDN
- ใช้ Font Awesome
- โทนหลักคือสีแดง/ขาว/เทา
- Sidebar responsive สำหรับ desktop และ mobile
- ใช้ `main-navbar.js` ในการ render navbar ให้ทุกหน้า

### ฝั่ง Admin

- ใช้ Bootstrap 5
- มี theme toggle: light, dark, auto
- ใช้ `localStorage.theme` เพื่อจำค่า theme
- ใช้ component กลางจาก `admin-common.js`

## ข้อควรระวัง

1. `index.html` และ `Profile.html` ยังเป็นไฟล์ว่าง
2. `admin/adminlog.html` ใช้ API URL แบบ hard-code แยกจาก `js/config.js`
3. หน้า Admin ต้องรันผ่าน local server เพราะมีการ `fetch()` ไฟล์ HTML component
4. ระบบ auth ฝั่ง browser เป็น client-side guard ไม่ใช่ security ชั้นสุดท้าย จึงควรตรวจสิทธิ์ซ้ำใน Google Apps Script ด้วย
5. มีการเก็บข้อมูล login ใน `localStorage` และ `sessionStorage` จึงควรระวังเมื่อใช้งานบนเครื่องสาธารณะ
6. หลายไฟล์มี inline JavaScript จำนวนมาก หากจะพัฒนาต่อควรแยก logic ออกเป็นไฟล์ JS เพื่อดูแลง่ายขึ้น
7. ข้อความภาษาไทยบางส่วนใน source code แสดงเป็นตัวอักษรเพี้ยนในบาง environment ควรตรวจ encoding ให้เป็น UTF-8

## แนวทางพัฒนาต่อ

- ทำ `index.html` ให้ redirect ไป `Login.html` หรือ `Home.html` ตามสถานะ login
- รวม endpoint admin login ให้ใช้ `js/config.js`
- แยก inline script ออกจาก HTML
- เพิ่ม role-based access control ใน Google Apps Script
- เพิ่ม loading/error state ให้เหมือนกันทุกหน้า
- เพิ่ม validation ของฟอร์มให้ครบทุก field สำคัญ
- เพิ่ม README ของฝั่ง Google Apps Script เช่น sheet schema และ code deployment
- เพิ่มระบบ export รายชื่อนักเรียน/พนักงาน
- เพิ่ม test manual checklist สำหรับก่อน deploy

## Quick Start สำหรับผู้พัฒนาคนใหม่

1. เปิด `js/config.js`
2. ตรวจว่า `scriptURL` เป็น Google Apps Script Web App URL ที่ deploy แล้ว
3. รัน project ผ่าน Live Server หรือ `python -m http.server`
4. เปิด `Login.html`
5. login ด้วย user ที่มีอยู่ใน backend
6. ถ้าต้องการเข้า Admin ให้ใช้ user role admin แล้วกด Admin Panel หรือเปิด `admin/adminlog.html`
7. ทดสอบ flow หลัก:
   - Login/logout
   - โหลด Dashboard
   - เพิ่ม/แก้ไข/ลบ Schedule
   - เพิ่ม/แก้ไข Student
   - update progress Course Class
   - update progress Regular Class
   - เพิ่ม/แก้ไข/ลบ Employee ใน Admin

## สรุป

Drone-Class เป็นระบบจัดการคลาสเรียนที่ใช้หน้าเว็บแบบ static และเชื่อมข้อมูลผ่าน Google Apps Script เหมาะกับการใช้งานภายในองค์กรหรือทีมขนาดเล็ก จุดเด่นคือ deploy ง่าย แก้ไขเร็ว และแยกหน้าผู้ใช้งานทั่วไปกับ Admin ชัดเจน ส่วนที่ควรดูแลเป็นพิเศษคือความปลอดภัยของ backend, การจัดการ role, และการรวม configuration ให้เป็นจุดเดียวเพื่อให้ดูแลต่อได้ง่ายขึ้น

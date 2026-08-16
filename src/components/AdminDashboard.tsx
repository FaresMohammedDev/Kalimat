"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  logout, addGrade, deleteGrade, addUnit, deleteUnit, 
  addLesson, deleteLesson, addWord, updateSetting, changePassword 
} from "@/app/admin/actions";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard({ grades, units, lessons, settings }: any) {
  const router = useRouter();
  
  // States for new items
  const [newGradeSlug, setNewGradeSlug] = useState("");
  const [newGradeTitle, setNewGradeTitle] = useState("");
  
  const [newUnitGrade, setNewUnitGrade] = useState(grades[0]?.id || "");
  const [newUnitTitle, setNewUnitTitle] = useState("");
  
  const [newLessonUnit, setNewLessonUnit] = useState(units[0]?.id || "");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  
  const [newWordLesson, setNewWordLesson] = useState(lessons[0]?.id || "");
  const [newEnWord, setNewEnWord] = useState("");
  const [newArWord, setNewArWord] = useState("");

  const [contactLinks, setContactLinks] = useState({
    contact_phone: settings.contact_phone || "",
    contact_telegram: settings.contact_telegram || "",
    contact_whatsapp: settings.contact_whatsapp || "",
    contact_facebook: settings.contact_facebook || "",
  });

  const [newPassword, setNewPassword] = useState("");

  const refresh = () => router.refresh();

  const handleAddGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    await addGrade(newGradeSlug, newGradeTitle);
    setNewGradeSlug(""); setNewGradeTitle("");
    refresh();
  };

  const handleAddUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    const gradeId = newUnitGrade || grades[0]?.id;
    if (!gradeId) return alert("Please add a grade first");
    await addUnit(Number(gradeId), newUnitTitle);
    setNewUnitTitle("");
    refresh();
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    const unitId = newLessonUnit || units[0]?.id;
    if (!unitId) return alert("Please add a unit first");
    await addLesson(Number(unitId), newLessonTitle);
    setNewLessonTitle("");
    refresh();
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    const lessonId = newWordLesson || lessons[0]?.id;
    if (!lessonId) return alert("Please add a lesson first");
    await addWord(Number(lessonId), newEnWord, newArWord);
    setNewEnWord(""); setNewArWord("");
    refresh();
  };

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(contactLinks)) {
      await updateSetting(key, value as string);
    }
    alert("Contact links updated!");
    refresh();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if(newPassword.length < 6) return alert("Password too short");
    await changePassword(newPassword);
    setNewPassword("");
    alert("Password updated!");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={async () => { await logout(); refresh(); }} className="primary-btn" style={{ background: 'var(--danger-accent)', borderColor: 'var(--danger-accent)' }}>Logout</button>
      </div>

      <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        {/* Grades */}
        <div className="admin-card">
          <h3>Manage Classes (Grades)</h3>
          <form onSubmit={handleAddGrade} style={{ marginTop: '15px' }}>
            <div className="form-group">
              <label>Slug (e.g. 3-prep)</label>
              <input className="form-control" value={newGradeSlug} onChange={e => setNewGradeSlug(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Title (e.g. الصف الثالث الإعدادي)</label>
              <input className="form-control" value={newGradeTitle} onChange={e => setNewGradeTitle(e.target.value)} required />
            </div>
            <button type="submit" className="primary-btn">Add Grade</button>
          </form>
          <ul style={{ marginTop: '15px', listStyle: 'none' }}>
            {grades.map((g: any) => (
              <li key={g.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', borderBottom: '1px solid var(--card-border)' }}>
                <span>{g.title}</span>
                <button onClick={async () => { await deleteGrade(g.id); refresh(); }} style={{ color: 'var(--danger-accent)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Units */}
        <div className="admin-card">
          <h3>Manage Units</h3>
          <form onSubmit={handleAddUnit} style={{ marginTop: '15px' }}>
            <div className="form-group">
              <label>Select Grade</label>
              <select className="form-control" value={newUnitGrade} onChange={e => setNewUnitGrade(e.target.value)} required>
                {grades.map((g: any) => <option key={g.id} value={g.id}>{g.title}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Unit Title (e.g. Unit 1)</label>
              <input className="form-control" value={newUnitTitle} onChange={e => setNewUnitTitle(e.target.value)} required />
            </div>
            <button type="submit" className="primary-btn">Add Unit</button>
          </form>
          <ul style={{ marginTop: '15px', listStyle: 'none' }}>
            {units.map((u: any) => (
              <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', borderBottom: '1px solid var(--card-border)' }}>
                <span>{u.title}</span>
                <button onClick={async () => { await deleteUnit(u.id); refresh(); }} style={{ color: 'var(--danger-accent)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Lessons */}
        <div className="admin-card">
          <h3>Manage Lessons</h3>
          <form onSubmit={handleAddLesson} style={{ marginTop: '15px' }}>
            <div className="form-group">
              <label>Select Unit</label>
              <select className="form-control" value={newLessonUnit} onChange={e => setNewLessonUnit(e.target.value)} required>
                {units.map((u: any) => <option key={u.id} value={u.id}>{u.title}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Lesson Title (e.g. Lesson 1 & 2)</label>
              <input className="form-control" value={newLessonTitle} onChange={e => setNewLessonTitle(e.target.value)} required />
            </div>
            <button type="submit" className="primary-btn">Add Lesson</button>
          </form>
           <ul style={{ marginTop: '15px', listStyle: 'none', maxHeight: '150px', overflowY: 'auto' }}>
            {lessons.map((l: any) => (
              <li key={l.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', borderBottom: '1px solid var(--card-border)' }}>
                <span>{l.title}</span>
                <button onClick={async () => { await deleteLesson(l.id); refresh(); }} style={{ color: 'var(--danger-accent)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Words */}
        <div className="admin-card">
          <h3>Add Word</h3>
          <form onSubmit={handleAddWord} style={{ marginTop: '15px' }}>
            <div className="form-group">
              <label>Select Lesson</label>
              <select className="form-control" value={newWordLesson} onChange={e => setNewWordLesson(e.target.value)} required>
                {lessons.map((l: any) => <option key={l.id} value={l.id}>{l.title}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>English Word</label>
              <input className="form-control" value={newEnWord} onChange={e => setNewEnWord(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Arabic Meaning</label>
              <input className="form-control" value={newArWord} onChange={e => setNewArWord(e.target.value)} required dir="rtl" />
            </div>
            <button type="submit" className="primary-btn">Add Word</button>
          </form>
        </div>

        {/* Settings */}
        <div className="admin-card">
          <h3>Contact Links</h3>
          <form onSubmit={handleUpdateContact} style={{ marginTop: '15px' }}>
            <div className="form-group">
              <label>Phone (e.g. +2012...)</label>
              <input className="form-control" value={contactLinks.contact_phone} onChange={e => setContactLinks({...contactLinks, contact_phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Telegram Link</label>
              <input className="form-control" value={contactLinks.contact_telegram} onChange={e => setContactLinks({...contactLinks, contact_telegram: e.target.value})} />
            </div>
            <div className="form-group">
              <label>WhatsApp Link</label>
              <input className="form-control" value={contactLinks.contact_whatsapp} onChange={e => setContactLinks({...contactLinks, contact_whatsapp: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Facebook Link</label>
              <input className="form-control" value={contactLinks.contact_facebook} onChange={e => setContactLinks({...contactLinks, contact_facebook: e.target.value})} />
            </div>
            <button type="submit" className="primary-btn">Update Links</button>
          </form>
        </div>

        {/* Password */}
        <div className="admin-card">
          <h3>Change Admin Password</h3>
          <form onSubmit={handleChangePassword} style={{ marginTop: '15px' }}>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
            </div>
            <button type="submit" className="primary-btn">Change Password</button>
          </form>
        </div>

      </div>
    </div>
  );
}

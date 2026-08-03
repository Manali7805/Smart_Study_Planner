import { useState, useEffect } from "react";


function Notes() {


  const [notes, setNotes] = useState(() => {

    const savedNotes = localStorage.getItem("studyNotes");

    return savedNotes
      ? JSON.parse(savedNotes)
      : [];

  });



  const [editIndex, setEditIndex] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  const [search, setSearch] = useState("");







  // Save Notes in Local Storage

  useEffect(() => {

    localStorage.setItem(

      "studyNotes",

      JSON.stringify(notes)

    );

  }, [notes]);









  // Add Note

  const addNote = () => {


    const newNote = {

      title:"Sample Notes",

      date:new Date().toLocaleDateString()

    };



    setNotes([

      ...notes,

      newNote

    ]);

  };










  // Delete Note

  const deleteNote = (index)=>{


    const updatedNotes = notes.filter(

      (_,i)=>i !== index

    );


    setNotes(updatedNotes);


  };









  // Edit Note

  const editNote = (index)=>{


    setEditIndex(index);

    setEditTitle(notes[index].title);


  };









  // Save Edited Note

  const saveEdit = (index)=>{


    const updatedNotes = notes.map((note,i)=>{


      if(i === index){


        return {

          ...note,

          title:editTitle

        };

      }


      return note;


    });



    setNotes(updatedNotes);


    setEditIndex(null);

    setEditTitle("");


  };










  // Search Filter

  const filteredNotes = notes.filter((note)=>{


    return note.title

      .toLowerCase()

      .includes(search.toLowerCase());


  });









  return (


    <div className="notes-page">





      <h1>

        📝 AI Notes Assistant

      </h1>




      <p>

        Store and manage your study notes easily

      </p>








      <div className="notes-container">







        {/* Upload Section */}



        <div className="upload-note">



          <h2>

            📤 Upload Notes

          </h2>





          <input

            type="file"

          />





          <button

            onClick={addNote}

          >

            Upload

          </button>



        </div>









        {/* Notes List */}



        <div className="notes-list">






          <h2>

            📚 Your Notes

          </h2>







          {/* Search Bar */}



          <input


            className="search-note"


            type="text"


            placeholder="🔍 Search Notes..."


            value={search}


            onChange={(e)=>setSearch(e.target.value)}


          />









          {

            filteredNotes.length === 0 ? (




              <div className="empty-note">



                <h3>

                  No notes found 📄

                </h3>




                <p>

                  Add notes or try another search.

                </p>



              </div>





            )



            :





            filteredNotes.map((note,index)=>(




              <div

                className="note-card"

                key={index}

              >








                {

                  editIndex === index ? (



                    <input


                      className="edit-input"


                      value={editTitle}


                      onChange={(e)=>

                        setEditTitle(e.target.value)

                      }


                    />



                  )





                  :





                  (


                    <h3>

                      📘 {note.title}

                    </h3>


                  )



                }









                <p>

                  📅 {note.date}

                </p>









                <div className="note-buttons">





                  {

                    editIndex === index ? (



                      <button


                        className="save-btn"


                        onClick={()=>saveEdit(index)}


                      >

                        💾 Save


                      </button>




                    )





                    :





                    (



                      <button


                        className="edit-btn"


                        onClick={()=>editNote(index)}


                      >

                        ✏️ Edit


                      </button>




                    )



                  }








                  <button


                    className="delete-btn"


                    onClick={()=>deleteNote(index)}


                  >

                    🗑 Delete


                  </button>






                </div>








              </div>





            ))



          }







        </div>









      </div>






    </div>


  );

}


export default Notes;
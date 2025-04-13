/* eslint-disable no-unused-vars */
import { useState } from "react"
import { motion } from "framer-motion"
import { Loader } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    sector: "",
    skills: [],
    profilePhoto: null,
  })

  const {register} = useAuth()

  const [skillInput, setSkillInput] = useState("")
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const sectors = [
    "Technologie",
    "Santé",
    "Éducation",
    "Finance",
    "Marketing",
    "Design",
    "Industrie manufacturière",
    "Commerce de détail",
    "Autre"
]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        profilePhoto: file,
      })

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      })
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleSkillInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      register({...formData, competences : formData.skills}).then(() => {
        navigate("/home")
      
    })
    } catch (error) {
      console.error("Registration failed", error)
    }
    finally {
      setLoading(false);
    }

  }

  return (
    
    <div className="fixed inset-0 z-50 bg-black/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 backdrop-blur">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl"
      >
        <div className="relative">
          {/* Glowing border animation */}
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(161, 4, 161, 0.2)",
                "0 0 0 5px rgba(151, 41, 224, 0.5)",
                "0 0 0 0px rgba(161, 4, 161, 0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute inset-0 rounded-lg"
          />

          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative z-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section 1: Basic Information */}
                <div className="space-y-6">


                  {/* Username field */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                      Nom d'utilisateur
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Mot de passe
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Professional Information */}
                <div className="space-y-6">
                  {/* Profile photo field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo de profil</label>
                    <div className="mt-1 flex items-center space-x-5">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-shrink-0">
                        {previewUrl ? (
                          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            <svg className="h-12 w-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        )}
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative">
                        <input
                          id="profile-photo"
                          name="profile-photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <label
                          htmlFor="profile-photo"
                          className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Changer
                        </label>
                      </motion.div>
                    </div>
                  </div>
                  {/* Sector field */}
                  <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                      Secteur d'activité
                    </label>
                    <div className="mt-1">
                      <select
                        id="sector"
                        name="sector"
                        required
                        value={formData.sector}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Sélectionnez un secteur</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Skills field */}
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                      Compétences
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="skills"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillInputKeyDown}
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 px-3 py-2 border"
                        placeholder="Ajouter une compétence"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={addSkill}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Ajouter
                      </motion.button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                          >
                            <span className="sr-only">Supprimer {skill}</span>
                            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                            </svg>
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center space-x-4 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading && <Loader className="animate-spin" />}
                  <span>S'inscrire</span>
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignupForm

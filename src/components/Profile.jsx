import React, { useMemo, useRef, useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Profile() {
  const { currentUser, token, putJson, updateUser } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [apiError, setApiError] = useState('')
  const [errors, setErrors] = useState({})

  const [imageError, setImageError] = useState('')
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const [cropOpen, setCropOpen] = useState(false)
  const [cropSrc, setCropSrc] = useState('')
  const [cropFileType, setCropFileType] = useState('image/jpeg')
  const [crop, setCrop] = useState({ x: 0, y: 0, size: 220 })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    currentPosition: '',
    experience: '',
    skills: '',
    education: '',
    linkedinUrl: '',
    githubUrl: '',
    profileImageUrl: ''
  })

  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const cropContainerRef = useRef(null)

  const [isDragging, setIsDragging] = useState(false)
  const dragOffsetRef = useRef({ dx: 0, dy: 0 })

  useLayoutEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    let cancelled = false

    const load = async () => {
      try {
        setIsLoadingProfile(true)
        setApiError('')

        const res = await fetch('/api/v1/users/me/profile', {
          method: 'GET',
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        })

        const contentType = res.headers.get('content-type') || ''
        const isJson = contentType.includes('application/json')
        const data = isJson
          ? await res.json().catch(() => null)
          : await res.text().catch(() => null)

        if (!res.ok) {
          const message =
            (data && data.message) ||
            (typeof data === 'string' && data) ||
            'Failed to load profile'

          if (!cancelled) setApiError(message)
          return
        }

        const firstName = data?.firstName || ''
        const lastName = data?.lastName || ''
        const fullName = `${firstName} ${lastName}`.trim()

        const rawProfileUrl = data?.profileImageUrl || ''
        const absProfileUrl =
          rawProfileUrl && rawProfileUrl.startsWith('/')
            ? `${window.location.origin.replace(':5173', ':8080')}${rawProfileUrl}`
            : rawProfileUrl

        const profileUrl = absProfileUrl
          ? `${absProfileUrl}${absProfileUrl.includes('?') ? '&' : '?'}t=${Date.now()}`
          : ''

        if (!cancelled) {
          setFormData({
            name: fullName,
            email: data?.email || currentUser.email || '',
            bio: data?.bio || '',
            location: data?.location || '',
            currentPosition: data?.currentPosition || '',
            experience: data?.experience || '',
            skills: data?.skills || '',
            education: data?.education || '',
            linkedinUrl: data?.linkedinUrl || '',
            githubUrl: data?.githubUrl || '',
            profileImageUrl: profileUrl
          })
        }
      } finally {
        if (!cancelled) setIsLoadingProfile(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [currentUser, navigate, token])

  const initials = useMemo(() => {
    const value = (formData.name || currentUser?.email || 'U').trim()
    return value[0] ? value[0].toUpperCase() : 'U'
  }, [formData.name, currentUser])

  const displayTitle = formData.currentPosition || 'Professional'

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    return newErrors
  }

  const handleCancel = () => {
    setIsEditing(false)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const [firstNameRaw, ...lastNameParts] = formData.name.trim().split(/\s+/)

    setIsSaving(true)
    setApiError('')

    try {
      const result = await putJson('/api/v1/users/me/profile', token, {
        firstName: firstNameRaw,
        lastName: lastNameParts.join(' '),
        bio: formData.bio,
        location: formData.location,
        currentPosition: formData.currentPosition,
        experience: formData.experience,
        skills: formData.skills,
        education: formData.education,
        linkedinUrl: formData.linkedinUrl,
        githubUrl: formData.githubUrl,
        profileImageUrl: formData.profileImageUrl
      })

      if (!result.ok) {
        setApiError(result.message || 'Failed to save profile')
        return
      }

      setIsEditing(false)
      setErrors({})

      if (result.data?.email) updateUser(result.data)
    } finally {
      setIsSaving(false)
    }
  }

  const openFilePicker = () => {
    setImageError('')
    fileInputRef.current?.click()
  }

  const onPickImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowed = ['image/jpeg', 'image/png', 'image/webp']

    if (!allowed.includes(file.type)) {
      setImageError('Only JPG, PNG, WEBP supported')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setCropSrc(String(reader.result || ''))
      setCropFileType(file.type)
      setCrop({ x: 0, y: 0, size: 220 })
      setCropOpen(true)
    }

    reader.readAsDataURL(file)
  }

  const clampCrop = (next) => {
    const container = cropContainerRef.current
    if (!container) return next

    const w = container.clientWidth
    const h = container.clientHeight

    const size = Math.max(120, Math.min(next.size, Math.min(w, h)))
    const x = Math.max(0, Math.min(next.x, w - size))
    const y = Math.max(0, Math.min(next.y, h - size))

    return { x, y, size }
  }

  const onCropMouseDown = (e) => {
    setIsDragging(true)
    dragOffsetRef.current = {
      dx: e.clientX - crop.x,
      dy: e.clientY - crop.y
    }
  }

  const onCropMouseMove = (e) => {
    if (!isDragging) return

    setCrop((prev) =>
      clampCrop({
        ...prev,
        x: e.clientX - dragOffsetRef.current.dx,
        y: e.clientY - dragOffsetRef.current.dy
      })
    )
  }

  const onCropMouseUp = () => setIsDragging(false)

  const renderCroppedBlob = async () => {
    const img = new Image()
    img.src = cropSrc

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })

    const container = cropContainerRef.current
    const scaleX = img.naturalWidth / container.clientWidth
    const scaleY = img.naturalHeight / container.clientHeight

    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512

    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.size * scaleX,
      crop.size * scaleY,
      0,
      0,
      512,
      512
    )

    return await new Promise((resolve) =>
      canvas.toBlob(resolve, cropFileType, 0.9)
    )
  }

  const uploadCroppedImage = async () => {
    try {
      setIsUploadingImage(true)

      const blob = await renderCroppedBlob()

      const fd = new FormData()
      fd.append(
        'image',
        new File([blob], 'profile.jpg', { type: blob.type })
      )

      const res = await fetch('/api/v1/users/me/profile-image', {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: fd
      })

      const data = await res.json()

      if (!res.ok) {
        setImageError(data.message || 'Upload failed')
        return
      }

      const rawUrl = data.profileImageUrl || ''

      const absUrl =
        rawUrl && rawUrl.startsWith('/')
          ? `${window.location.origin.replace(':5173', ':8080')}${rawUrl}`
          : rawUrl

      const finalUrl = `${absUrl}?t=${Date.now()}`

      setFormData((prev) => ({
        ...prev,
        profileImageUrl: finalUrl
      }))

      updateUser({
        ...currentUser,
        profileImageUrl: finalUrl
      })

      setCropOpen(false)
    } catch {
      setImageError('Failed to upload image')
    } finally {
      setIsUploadingImage(false)
    }
  }

  if (!currentUser || isLoadingProfile) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="h-20 w-20 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading Profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.08)]">

        {/* HEADER */}
        <div className="p-8 bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] bg-slate-900 flex items-center justify-center">
                  {formData.profileImageUrl ? (
                    <img
                      src={formData.profileImageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-emerald-400">
                      {initials}
                    </span>
                  )}
                </div>

                {isEditing && (
                  <button
                    onClick={openFilePicker}
                    className="absolute -bottom-1 right-0 px-3 py-1 text-xs rounded-full bg-emerald-400 text-black font-semibold"
                  >
                    Change
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPickImage}
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {formData.name || currentUser.email}
                </h1>
                <p className="text-emerald-300 mt-1">{displayTitle}</p>
                {formData.location && (
                  <p className="text-slate-300">{formData.location}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-8">

          {apiError && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl">
              {apiError}
            </div>
          )}

          {imageError && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl">
              {imageError}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">

              {[
                ['name', 'Full Name'],
                ['email', 'Email'],
                ['location', 'Location'],
                ['currentPosition', 'Current Position'],
                ['linkedinUrl', 'LinkedIn URL'],
                ['githubUrl', 'GitHub URL']
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="block mb-2 text-sm text-slate-300">
                    {label}
                  </label>
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:border-emerald-400 outline-none"
                  />
                </div>
              ))}

              {['bio', 'experience', 'education', 'skills'].map((name) => (
                <div key={name} className="md:col-span-2">
                  <label className="block mb-2 text-sm text-slate-300 capitalize">
                    {name}
                  </label>
                  <textarea
                    rows="4"
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 focus:border-emerald-400 outline-none"
                  />
                </div>
              ))}

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-3 rounded-xl bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:scale-105 duration-300"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">

              <div className="lg:col-span-2 space-y-6">

                {formData.bio && (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                      About
                    </h3>
                    <p className="text-slate-300 whitespace-pre-line">
                      {formData.bio}
                    </p>
                  </div>
                )}

                {formData.experience && (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                      Experience
                    </h3>
                    <p className="text-slate-300 whitespace-pre-line">
                      {formData.experience}
                    </p>
                  </div>
                )}

                {formData.education && (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                      Education
                    </h3>
                    <p className="text-slate-300 whitespace-pre-line">
                      {formData.education}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-6">

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                    Skills
                  </h3>

                  {formData.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.split(',').map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-sm"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400">No skills added yet.</p>
                  )}
                </div>

                {(formData.linkedinUrl || formData.githubUrl) && (
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                      Links
                    </h3>

                    <div className="space-y-2">
                      {formData.linkedinUrl && (
                        <a
                          href={formData.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-cyan-300 hover:text-cyan-200"
                        >
                          LinkedIn
                        </a>
                      )}

                      {formData.githubUrl && (
                        <a
                          href={formData.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-white hover:text-emerald-300"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      {/* CROP MODAL */}
      {cropOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onMouseMove={onCropMouseMove}
          onMouseUp={onCropMouseUp}
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setCropOpen(false)}
          />

          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/10 p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Crop Profile Photo
            </h3>

            <div
              ref={cropContainerRef}
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black"
            >
              <img
                src={cropSrc}
                alt="Crop"
                className="absolute inset-0 w-full h-full object-contain"
              />

              <div
                onMouseDown={onCropMouseDown}
                className="absolute border-2 border-emerald-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] cursor-move"
                style={{
                  left: crop.x,
                  top: crop.y,
                  width: crop.size,
                  height: crop.size
                }}
              />
            </div>

            <div className="mt-5">
              <input
                type="range"
                min="120"
                max="420"
                value={crop.size}
                onChange={(e) =>
                  setCrop((prev) =>
                    clampCrop({
                      ...prev,
                      size: Number(e.target.value)
                    })
                  )
                }
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setCropOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={uploadCroppedImage}
                disabled={isUploadingImage}
                className="px-4 py-2 rounded-xl bg-emerald-400 text-black font-semibold"
              >
                {isUploadingImage ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
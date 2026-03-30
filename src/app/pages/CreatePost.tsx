import { useState, useRef } from 'react'
import { ChevronLeft, Camera, X, MapPin, UtensilsCrossed } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useFeed } from '../context/FeedContext'

export function CreatePost() {
  const navigate = useNavigate()
  const { createPost } = useFeed()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [images, setImages] = useState<string[]>([])
  const [dish, setDish] = useState('')
  const [location, setLocation] = useState('')
  const [caption, setCaption] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = dish.trim().length > 0 && images.length > 0

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => {
        const result = ev.target?.result as string
        if (result) setImages(prev => [...prev, result])
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  function removeImage(index: number) {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  function handleSubmit() {
    if (!canSubmit || isSubmitting) return
    setIsSubmitting(true)
    createPost({ dish: dish.trim(), location: location.trim() || 'Unknown location', caption: caption.trim(), images })
    navigate('/', { replace: true })
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-50/50 flex flex-col max-w-md mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4 bg-white border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">New Post</h1>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`px-4 py-1.5 rounded-full text-[14px] font-bold transition-all ${
            canSubmit
              ? 'bg-[#DE6543] text-white shadow-md shadow-orange-500/20 active:scale-95'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          Share
        </button>
      </div>

      <div className="flex-1 px-4 pt-5 pb-10">
        {/* Image Upload */}
        <div className="mb-5">
          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1">
            {/* Existing images */}
            {images.map((img, i) => (
              <div key={i} className="relative flex-shrink-0">
                <img
                  src={img}
                  alt={`upload ${i}`}
                  className="w-28 h-36 object-cover rounded-2xl border border-gray-100"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-gray-900/60 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            ))}

            {/* Add image button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-colors active:scale-[0.97] ${
                images.length === 0
                  ? 'w-full h-44 border-[#DE6543]/30 bg-orange-50/50'
                  : 'w-28 h-36 border-gray-200 bg-white'
              }`}
            >
              <div className={`rounded-full flex items-center justify-center ${
                images.length === 0 ? 'w-12 h-12 bg-[#DE6543]/10' : 'w-8 h-8 bg-gray-100'
              }`}>
                <Camera className={`${images.length === 0 ? 'w-6 h-6 text-[#DE6543]' : 'w-4 h-4 text-gray-500'}`} />
              </div>
              {images.length === 0 && (
                <>
                  <p className="text-[14px] font-semibold text-gray-700">Add Photos</p>
                  <p className="text-[12px] text-gray-400">Tap to upload</p>
                </>
              )}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden mb-4">
          {/* Dish */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-50">
            <UtensilsCrossed className="w-4.5 h-4.5 text-[#DE6543] flex-shrink-0" />
            <input
              type="text"
              value={dish}
              onChange={e => setDish(e.target.value)}
              placeholder="Dish name (required)"
              maxLength={60}
              className="flex-1 text-[15px] font-semibold text-gray-900 placeholder:text-gray-300 placeholder:font-normal bg-transparent outline-none"
            />
          </div>
          {/* Location */}
          <div className="flex items-center gap-3 px-4 py-4">
            <MapPin className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Restaurant or location"
              maxLength={60}
              className="flex-1 text-[15px] text-gray-700 placeholder:text-gray-300 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Caption */}
        <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Write a caption… what made it special? 🤤"
            maxLength={280}
            rows={4}
            className="w-full px-4 py-4 text-[14px] text-gray-800 placeholder:text-gray-300 bg-transparent outline-none resize-none"
          />
          <div className="px-4 pb-3 text-right">
            <span className="text-[11px] text-gray-300">{caption.length}/280</span>
          </div>
        </div>
      </div>
    </div>
  )
}

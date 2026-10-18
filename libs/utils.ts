export const getInitials = ({
  name
} : {
  name: string | null
}) => {
  if (!name) return "User"

  const parts = name.trim().split(" ").filter(Boolean)
  if (parts.length === 1) return parts[0]?.slice(0, 2).toUpperCase() ?? "User"
  
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

export const trimText = ({
  value,
  maxLength = 50,
} : {
  value: string | null,
  maxLength: number
}) => {
  const text = (value ?? "").trim()
  if (!text) return "-"
  if (text.length <= maxLength) return text
  if (maxLength <= 3) return text.slice(0, maxLength)
  return (
    `${text.slice(0, maxLength - 3).trimEnd()}...`
  )
}


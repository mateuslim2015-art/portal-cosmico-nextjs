
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { uploadFile } from "@/lib/s3"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("photo") as File
    
    if (!file) {
      return NextResponse.json({ error: "Nenhuma foto enviada" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Upload to S3
    const cloudStoragePath = await uploadFile(buffer, file.name)
    
    return NextResponse.json({ 
      success: true, 
      cloudStoragePath,
      message: "Foto enviada com sucesso" 
    })
    
  } catch (error) {
    console.error('Photo upload error:', error)
    return NextResponse.json(
      { error: "Erro ao fazer upload da foto" },
      { status: 500 }
    )
  }
}

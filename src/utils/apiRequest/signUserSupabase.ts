import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const userSignUp = async (
  email: string,
  password: string,
  option: object,
): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: option,
      },
    })

    if (error) {
      console.error(error)
      throw new Error('[ERROR] 회원가입 실패')
    }
    console.log(data)
  } catch (error) {
    console.error(error)
    throw new Error('[ERROR] 회원가입 실패')
  }
}

export const userSignIn = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error(error)
      throw new Error('[ERROR] 로그인 실패')
    }

    console.log(data)
    alert(`로그인 성공\n${data.user.email}`)
  } catch (error) {
    console.error(error)
    throw new Error('[ERROR] 로그인 실패')
  }
}

export const userSignOut = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    alert(`로그인 상태가 아닙니다!`)
    return
  }

  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
      throw new Error('[ERROR] 로그아웃 실패')
    }

    alert(`로그아웃 완료`)
  } catch (error) {
    console.log(error)
    throw new Error('[ERROR] 로그아웃 실패')
  }
}

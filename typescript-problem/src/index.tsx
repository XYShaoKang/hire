interface Action<T> {
  payload?: T
  type: string
}

class EffectModule {
  count = 1
  message = 'hello!'

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: 'delay',
    }))
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: 'set-message',
    }
  }
}

type PromiseReturnType<T> = T extends Promise<infer V> ? V : never
type ActionReturnType<T> = T extends Action<infer V> ? V : never

type ChangeParam<
  T extends (input: any) => any,
  P = Parameters<T>[0]
> = P extends Promise<any>
  ? (input: PromiseReturnType<P>) => PromiseReturnType<ReturnType<T>>
  : (input: ActionReturnType<P>) => ReturnType<T>

type FunPropKeys<T> = {
  [K in keyof T]: T[K] extends (input: any) => any ? K : never
}[keyof T]

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => {
  [K in FunPropKeys<EffectModule>]: EffectModule[K] extends (input: any) => any
    ? ChangeParam<EffectModule[K]>
    : never
}

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
})

type Connected = {
  delay(input: number): Action<string>
  setMessage(action: Date): Action<number>
}

export const connected: Connected = connect(new EffectModule())

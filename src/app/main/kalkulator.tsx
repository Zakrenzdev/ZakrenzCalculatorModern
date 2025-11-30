"use client"

import { useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Info, LayoutDashboard, Trash2, History, MoreVertical, Copy } from "lucide-react"


export default function CalculatorModern() {
    const [display, setDisplay] = useState("0")
    const [previous, setPrevious] = useState("")
    const [operation, setOperation] = useState("")
    const [lastResult, setLastResult] = useState(0)
    const [history, setHistory] = useState<string[]>([])
    const [showHistory, setShowHistory] = useState(false)
    const [calcMode, setCalcMode] = useState("standard")
    const [precision, setPrecision] = useState("2")
    const [showAlert, setShowAlert] = useState(false)

    const handleNumber = (num: string) => {
        if (display === "0") {
            setDisplay(num)
        } else {
            setDisplay(display + num)
        }
    }

    const handleOperation = (op: string) => {
        if (previous && operation) {
            calculate()
        }
        setPrevious(display)
        setOperation(op)
        setDisplay("0")
    }

    const calculate = () => {
        const prev = parseFloat(previous)
        const current = parseFloat(display)
        let result = 0

        switch (operation) {
            case "+":
                result = prev + current
                break
            case "-":
                result = prev - current
                break
            case "×":
                result = prev * current
                break
            case "÷":
                result = current !== 0 ? prev / current : 0
                break
            case "^":
                result = Math.pow(prev, current)
                break
            default:
                return
        }

        result = parseFloat(result.toFixed(parseInt(precision)))
        const calculation = `${prev} ${operation} ${current} = ${result}`
        setHistory([calculation, ...history].slice(0, 10))
        setLastResult(result)
        setDisplay(result.toString())
        setPrevious("")
        setOperation("")
    }

    const clear = () => {
        setDisplay("0")
        setPrevious("")
        setOperation("")
    }

    const handleDecimal = () => {
        if (!display.includes(".")) {
            setDisplay(display + ".")
        }
    }

    const handlePercentage = () => {
        const num = parseFloat(display)
        setDisplay((num / 100).toString())
    }

    const toggleSign = () => {
        const num = parseFloat(display)
        setDisplay((num * -1).toString())
    }

    const clearHistory = () => {
        setHistory([])
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(display)
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 2000)
    }

    const handleScientific = (func: "sqrt" | "square" | "sin" | "cos" | "tan" | "log" | "ln") => {
        const num = parseFloat(display)
        let result = 0
        switch (func) {
            case "sqrt":
                result = Math.sqrt(num)
                break
            case "square":
                result = num * num
                break
            case "sin":
                result = Math.sin(num)
                break
            case "cos":
                result = Math.cos(num)
                break
            case "tan":
                result = Math.tan(num)
                break
            case "log":
                result = Math.log10(num)
                break
            case "ln":
                result = Math.log(num)
                break
        }
        setDisplay(result.toFixed(parseInt(precision)).toString())
    }

    return (
        <div className="min-h-screen w-full grid place-items-center p-4 bg-gray-50">
            <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center justify-between pb-3">
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold tracking-tight"> Zakrenz Simple Calculator</h1>
                        <p className="text-sm text-muted-foreground">For simple everyday calculations</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="flex items-center gap-1 bg-foreground text-background">
                            <LayoutDashboard className="w-3 h-3" />
                            Modern UI
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={copyToClipboard}>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Result
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setShowHistory(!showHistory)}>
                                    <History className="w-4 h-4 mr-2" />
                                    Toggle History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={clearHistory}>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Clear History
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {showAlert && (
                    <Alert className="mb-4">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                            Action completed successfully
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-lg shadow-lg p-3 bg-foreground text-background">
                        <p className="text-xs opacity-80">Last Result</p>
                        <p className="text-lg font-bold truncate">{lastResult}</p>
                    </div>
                    <div className="rounded-lg shadow-lg p-3 bg-foreground text-background cursor-pointer" onClick={() => setShowHistory(!showHistory)}>
                        <p className="text-xs opacity-80">History</p>
                        <p className="text-lg font-bold">{history.length} ops</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <Select value={calcMode} onValueChange={setCalcMode}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="scientific">Scientific</SelectItem>
                            <SelectItem value="programmer">Programmer</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={precision} onValueChange={setPrecision}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Precision" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">0 decimal</SelectItem>
                            <SelectItem value="2">2 decimal</SelectItem>
                            <SelectItem value="4">4 decimal</SelectItem>
                            <SelectItem value="6">6 decimal</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {showHistory && (
                    <div className="mb-4 rounded-lg border p-3 max-h-40 overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold">Calculation History</h3>
                            <Button variant="ghost" size="sm" onClick={clearHistory}>
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        {history.length === 0 ? (
                            <p className="text-xs text-muted-foreground">No calculations yet</p>
                        ) : (
                            <div className="space-y-1">
                                {history.map((item, index) => (
                                    <p key={index} className="text-xs font-mono">{item}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="mb-4 rounded-lg bg-gray-100 p-4">
                    <div className="text-right">
                        {previous && operation && (
                            <p className="text-sm text-muted-foreground">{previous} {operation}</p>
                        )}
                        <p className="text-3xl font-bold truncate">{display}</p>
                    </div>
                </div>

                {calcMode === "scientific" && (
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        <Button className="h-10 bg-foreground text-background shadow-sm transition hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">√</Button>
                        <Button className="h-10 bg-foreground text-background shadow-sm transition hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">x²</Button>
                        <Button onClick={() => handleOperation("^")} className="h-10 bg-foreground text-background shadow-sm transition hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">xʸ</Button>
                        <Button className="h-10 bg-foreground text-background shadow-sm transition hover:shadow-md hover:-translate-y-0.5 active:translate-y-0" onClick={() => handleScientific("log")}>log</Button>

                        <Button variant="outline" className="h-10 transition hover:bg-foreground hover:text-background" onClick={() => handleScientific("sin")}>sin</Button>
                        <Button variant="outline" className="h-10 transition hover:bg-foreground hover:text-background" onClick={() => handleScientific("cos")}>cos</Button>
                        <Button variant="outline" className="h-10 transition hover:bg-foreground hover:text-background" onClick={() => handleScientific("tan")}>tan</Button>
                        <Button variant="outline" className="h-10 transition hover:bg-foreground hover:text-background" onClick={() => handleScientific("ln")}>ln</Button>
                    </div>

                )}

                <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" onClick={clear} className="h-14">C</Button>
                    <Button variant="outline" onClick={toggleSign} className="h-14">+/-</Button>
                    <Button variant="outline" onClick={handlePercentage} className="h-14">%</Button>
                    <Button onClick={() => handleOperation("÷")} className="h-14 bg-foreground shadow-lg text-background hover:bg-foreground/90">÷</Button>

                    <Button variant="outline" onClick={() => handleNumber("7")} className="h-14">7</Button>
                    <Button variant="outline" onClick={() => handleNumber("8")} className="h-14">8</Button>
                    <Button variant="outline" onClick={() => handleNumber("9")} className="h-14">9</Button>
                    <Button onClick={() => handleOperation("×")} className="h-14 bg-foreground shadow-lg text-background hover:bg-foreground/90">×</Button>

                    <Button variant="outline" onClick={() => handleNumber("4")} className="h-14">4</Button>
                    <Button variant="outline" onClick={() => handleNumber("5")} className="h-14">5</Button>
                    <Button variant="outline" onClick={() => handleNumber("6")} className="h-14">6</Button>
                    <Button onClick={() => handleOperation("-")} className="h-14 bg-foreground shadow-lg text-background hover:bg-foreground/90">-</Button>

                    <Button variant="outline" onClick={() => handleNumber("1")} className="h-14">1</Button>
                    <Button variant="outline" onClick={() => handleNumber("2")} className="h-14">2</Button>
                    <Button variant="outline" onClick={() => handleNumber("3")} className="h-14">3</Button>
                    <Button onClick={() => handleOperation("+")} className="h-14 bg-foreground shadow-lg text-background hover:bg-foreground/90">+</Button>

                    <Button variant="outline" onClick={() => handleNumber("0")} className="h-14 col-span-2">0</Button>
                    <Button variant="outline" onClick={handleDecimal} className="h-14">.</Button>
                    <Button onClick={calculate} className="h-14 bg-foreground shadow-lg text-background hover:bg-foreground/90">=</Button>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full mt-4">
                            <Info className="w-4 h-4 mr-2" />
                            About Calculator
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Zakrenz Modern Calculator</DialogTitle>
                            <DialogDescription>
                                A feature-rich calculator with multiple modes and precision settings. Built with React and shadcn/ui components. And made with love by Zakrenz. 
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2 text-sm">
                            <p><strong>Modes:</strong> Standard, Scientific, Programmer</p>
                            <p><strong>Precision:</strong> Adjustable decimal places</p>
                            <p><strong>Features:</strong> History tracking, copy result, keyboard support</p>
                            <p><strong>Developer:</strong> By ZakrenzModder</p>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
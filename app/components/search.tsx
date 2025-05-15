import { Button, Input, XStack } from "tamagui";
import {NativeSyntheticEvent, StyleSheet, TextInputChangeEventData} from 'react-native';
import { Search as SearchIcon } from '@tamagui/lucide-icons'
import { useEffect, useState } from "react";
import { useLazyGetStocksQuery } from "@/store/stocks/stocks.api";
import { ToastViewport, useToastController } from "@tamagui/toast";
import ErrorToast from "./error-toast";

export default function Search() {
    const [ticker, setTicker] = useState('')
    const [getStocksTrigger, {
        data: items,
        isLoading,
        isFetching, // Useful to know if a refetch is happening while data is displayed
        isError,
        error,
        isSuccess}] = useLazyGetStocksQuery();
    const toast = useToastController();

    useEffect(() => {
        if(isSuccess){
            //TODO: go to stock view page
        }
        else if(isError){
            toast.show('Error',{
                message: `Could not load resource \n ${error}`
            })
        }
    }, [items, isSuccess, isError])

    const onChange = (value: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setTicker(value.nativeEvent.text)
    }

    const onBtnPress = () => {
        getStocksTrigger({
            tickers: tickerToList(),
            attributes: undefined,
            end: undefined,
            fundamentals: undefined,
            period: undefined,
            start: undefined
          })
    }

    function tickerToList() {
        return ticker.split(' ')
    }
    
    return (
        <XStack alignItems="center" display="flex" style={styles.container}>
            <Input onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => onChange(e)}
                   value={ticker} placeholder="Search ticker, space to add more than one"
                   autoCapitalize='none' width="100%"/>
            <Button onPress={() => onBtnPress()} 
                    alignSelf="center" icon={SearchIcon} size="$3" style={styles.search_button} />
            <ErrorToast />
        </XStack>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        position:'relative'
    },
    search_button: {
        position: 'absolute',
        right: '0%',
        marginEnd: 25
    }
})
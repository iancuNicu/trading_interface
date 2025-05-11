import { Button, Input, XStack } from "tamagui";
import {NativeSyntheticEvent, StyleSheet, TextInputChangeEventData} from 'react-native';
import { Search as SearchIcon } from '@tamagui/lucide-icons'
import { useState } from "react";
import { useLazyGetStocksQuery } from "@/store/stocks/stocks.api";

export default function Search() {
    const [ticker, setTicker] = useState('')
    const [getStocksTrigger, {data: items,
        isLoading,
        isFetching, // Useful to know if a refetch is happening while data is displayed
        isError,
        error,
        isSuccess}] = useLazyGetStocksQuery();

    const onChange = (value: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setTicker(value.nativeEvent.text)
    }

    const onBtnPress = () => {
        console.log('BTN press');
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